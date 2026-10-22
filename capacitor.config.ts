import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.islamforeveryone.app',
  appName: 'Islam For Everyone',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      iconColor: '#0F766E',
      presentationOptions: ['badge', 'sound', 'banner', 'list']
    }
  }
};

export default config;
