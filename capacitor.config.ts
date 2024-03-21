import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jeepq.sveltekit.sqlite',
  appName: 'vite-sveltekit-capacitor-sqlite',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
