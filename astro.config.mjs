import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://marcelotaparelli.com.br',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
  server: { host: '0.0.0.0', port: 3000 },
  vite: {
    plugins: [tailwindcss()],
    server: { strictPort: true },
    preview: { strictPort: true },
  },
  devToolbar: { enabled: false },
});
