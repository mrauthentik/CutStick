import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crx from 'vite-plugin-web-extension'
import path from 'path'

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
        popup: path.resolve(__dirname, 'index.html'),
        options: path.resolve(__dirname, 'options.html')
      }
    }
  },
  resolve:{
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})