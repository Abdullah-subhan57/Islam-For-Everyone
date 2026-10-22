import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import { GoogleGenAI } from '@google/genai/node';

type AssistantMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AssistantRequest = {
  language: 'en' | 'ur';
  messages: AssistantMessage[];
};

const router = express.Router();
const rateLimits = new Map<string, { count: number; expiresAt: number }>();
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONVERSATION_LENGTH = 16000;
const RATE_LIMIT_COUNT = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseAssistantRequest = (value: unknown): AssistantRequest | null => {
  if (!isRecord(value) || !Array.isArray(value.messages)) return null;
  if (value.language !== 'en' && value.language !== 'ur') return null;
  if (value.messages.length === 0 || value.messages.length > MAX_MESSAGES) return null;

  const messages: AssistantMessage[] = [];
  let conversationLength = 0;

  for (const entry of value.messages) {
    if (
      !isRecord(entry) ||
      (entry.role !== 'user' && entry.role !== 'assistant') ||
      typeof entry.content !== 'string'
    ) {
      return null;
    }

    const content = entry.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) return null;
    conversationLength += content.length;
    if (conversationLength > MAX_CONVERSATION_LENGTH) return null;
    messages.push({ role: entry.role, content });
  }

  if (messages[0].role !== 'user' || messages[messages.length - 1].role !== 'user') return null;

  return { language: value.language, messages };
};

const applyRateLimit = (request: Request, response: Response, next: NextFunction) => {
  const now = Date.now();
  const clientKey = request.socket.remoteAddress ?? 'unknown';
  const current = rateLimits.get(clientKey);

  if (current && current.expiresAt > now) {
    if (current.count >= RATE_LIMIT_COUNT) {
      response.setHeader('Retry-After', String(Math.ceil((current.expiresAt - now) / 1000)));
      response.status(429).json({ error: 'Too many messages. Please wait a moment and try again.' });
      return;
    }
    current.count += 1;
  } else {
    rateLimits.set(clientKey, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
  }

  if (rateLimits.size > 1000) {
    for (const [key, limit] of rateLimits) {
      if (limit.expiresAt <= now) rateLimits.delete(key);
    }
  }

  next();
};

router.get('/status', (_request, response) => {
  response.json({ configured: Boolean(process.env.GEMINI_API_KEY) });
});

router.post('/chat', express.json({ limit: '24kb' }), applyRateLimit, async (request, response) => {
  const input = parseAssistantRequest(request.body);
  if (!input) {
    response.status(400).json({ error: 'The message format is invalid or exceeds the allowed length.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    response.status(503).json({ error: 'The AI assistant is not configured on the server yet.' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: input.messages.map(({ role, content }) => ({
        role: role === 'assistant' ? 'model' : 'user',
        parts: [{ text: content }]
      })),
      config: {
        systemInstruction: input.language === 'ur'
          ? 'آپ Islam for Everyone کے دو لسانی معاون ہیں۔ صارف کے سوال کا اردو میں احترام اور وضاحت سے جواب دیں، اور ایپ کے فیچرز کے بارے میں رہنمائی کریں۔ قرآن یا حدیث کے الفاظ، حوالہ جات، تاریخی حقائق یا شرعی احکام کبھی نہ گھڑیں۔ اگر مستند حوالہ یقینی نہ ہو تو اپنی غیر یقینی واضح کریں۔ ذاتی فتویٰ یا حساس شرعی معاملے میں مستند اہلِ علم سے رجوع کرنے کا کہیں۔ آپ عمومی معلومات فراہم کرتے ہیں، عالمِ دین کا متبادل نہیں۔'
          : 'You are the bilingual assistant for Islam for Everyone. Answer respectfully and clearly in English, and help users navigate the app. Never invent Quran or Hadith quotations, references, historical facts, or religious rulings. State uncertainty when you cannot verify a source. Refer personal fatwas and sensitive religious matters to qualified scholars. You provide general information and are not a substitute for a scholar.',
        temperature: 0.3,
        maxOutputTokens: 1200
      }
    });

    const reply = result.text?.trim();
    if (!reply) {
      response.status(502).json({ error: 'The AI service returned an empty response. Please try again.' });
      return;
    }

    response.json({ reply });
  } catch (error) {
    console.error(
      'Gemini assistant request failed:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    response.status(502).json({ error: 'The AI assistant could not answer right now. Please try again.' });
  }
});

router.use((error: unknown, _request: Request, response: Response, next: NextFunction) => {
  if (isRecord(error) && error.type === 'entity.parse.failed') {
    response.status(400).json({ error: 'The request body must be valid JSON.' });
    return;
  }
  if (isRecord(error) && error.type === 'entity.too.large') {
    response.status(413).json({ error: 'The request is too large.' });
    return;
  }
  next(error);
});

export const assistantRouter = router;
