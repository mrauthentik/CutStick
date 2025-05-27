import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crx from 'vite-plugin-web-extension'

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: () => ({
        manifest_version: 3,
        name: 'Content Filter Extension',
        version: '1.0.0',
        permissions: ['storage'],
        content_scripts: [{
          matches: ['<all_urls>'],
          js: ['src/content-script/main.ts'],
          run_at: 'document_end'
        }],
        action: {
          default_popup: 'index.html'
        },
        web_accessible_resources: [{
          resources: ['model/*'],
          matches: ['<all_urls>']
        }]
      })
    })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        options: 'options.html'
      }
    }
  }
})