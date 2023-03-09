import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  apiRoute: {
    platform: 'vercel',
  },
  mfsu: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
});
