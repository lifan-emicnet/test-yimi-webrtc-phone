import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import 'dotenv/config';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3001,
  },
  source: {
    define: {
      'process.env': {
        APP_SERVER: JSON.stringify(process.env.APP_SERVER),
        APP_OFFICE_NUMBER: JSON.stringify(process.env.APP_OFFICE_NUMBER),
        APP_NUMBER: JSON.stringify(process.env.APP_NUMBER),
        APP_PASSWORD: JSON.stringify(process.env.APP_PASSWORD),
      },
    },
  },
});
