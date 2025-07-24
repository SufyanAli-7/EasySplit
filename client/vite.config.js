import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon.svg'],
      manifest: {
        name: 'ExpenseSplit - Smart & Fair',
        short_name: 'ExpenseSplit',
        description: 'Split expenses easily with friends and family. Track shared expenses, split bills fairly, and settle up with friends.',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        orientation: 'portrait-primary',
        categories: ['finance', 'productivity', 'utilities'],
        icons: [
          {
            src: 'icon-72x72.svg',
            sizes: '72x72',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-96x96.svg',
            sizes: '96x96',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-128x128.svg',
            sizes: '128x128',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-144x144.svg',
            sizes: '144x144',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-152x152.svg',
            sizes: '152x152',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-384x384.svg',
            sizes: '384x384',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          }
        ],
        shortcuts: [
          {
            name: 'Add Expense',
            short_name: 'Add Expense',
            description: 'Quickly add a new expense',
            url: '/add-expense',
            icons: [{ src: 'icon-192x192.svg', sizes: '192x192' }]
          },
          {
            name: 'View Groups',
            short_name: 'Groups',
            description: 'View and manage your groups',
            url: '/groups',
            icons: [{ src: 'icon-192x192.svg', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
