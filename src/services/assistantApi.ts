export type AssistantRole = 'user' | 'assistant';

export interface AssistantMessage {
  role: AssistantRole;
  content: string;
}

interface AssistantResponse {
  reply: string;
}

export type AssistantAvailability = 'ready' | 'needs-key' | 'unavailable';

const isAssistantResponse = (value: unknown): value is AssistantResponse =>
  typeof value === 'object' &&
  value !== null &&
  'reply' in value &&
  typeof value.reply === 'string';

export const checkAssistantAvailability = async (): Promise<AssistantAvailability> => {
  try {
    const response = await fetch('/api/assistant/status');
    if (!response.ok) return 'unavailable';
    const body: unknown = await response.json();
    if (
      typeof body !== 'object' ||
      body === null ||
      !('configured' in body) ||
      typeof body.configured !== 'boolean'
    ) return 'unavailable';
    return body.configured ? 'ready' : 'needs-key';
  } catch {
    return 'unavailable';
  }
};

export const sendAssistantMessage = async (
  messages: AssistantMessage[],
  language: 'en' | 'ur'
): Promise<string> => {
  const response = await fetch('/api/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, language })
  });

  const responseText = await response.text();
  let body: unknown;
  try {
    body = JSON.parse(responseText);
  } catch {
    if (response.status === 502 || response.status === 503) {
      throw new Error(language === 'ur'
        ? 'معاون API سرور سے منسلک نہیں۔ پرانا dev server بند کرکے دوبارہ npm run dev چلائیں۔'
        : 'The assistant API server is not connected. Stop the old dev server and restart with npm run dev.');
    }
    throw new Error(`The assistant service returned an invalid response (${response.status}).`);
  }

  if (!response.ok) {
    if (
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'string'
    ) {
      if (response.status === 503) {
        throw new Error(language === 'ur'
          ? 'AI جواب کے لیے GEMINI_API_KEY درکار ہے۔ .env.example کو .env میں نقل کریں، اپنی Gemini key صرف وہاں شامل کریں، پھر سرور دوبارہ شروع کریں۔'
          : 'AI answers need GEMINI_API_KEY. Copy .env.example to .env, add your Gemini key there only, then restart the server.');
      }
      throw new Error(body.error);
    }
    throw new Error(`The assistant service returned an error (${response.status}).`);
  }

  if (!isAssistantResponse(body) || !body.reply.trim()) {
    throw new Error('The assistant service returned an invalid response.');
  }

  return body.reply.trim();
};
