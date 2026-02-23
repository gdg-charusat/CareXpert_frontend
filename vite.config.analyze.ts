import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// Special config for bundle analysis
// Run with: vite build --config vite.config.analyze.ts
export default defineConfig({
    plugins: [
        react(),
        // Bundle analyzer - only in this config
        visualizer({
            open: true,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
            template: 'treemap', // sunburst, treemap, network
        }),
        // Gzip compression
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        // Code splitting configuration
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor splitting for better caching
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-select',
                        '@radix-ui/react-tabs',
                        '@radix-ui/react-avatar',
                        '@radix-ui/react-scroll-area',
                    ],
                    'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
                    'chart-vendor': ['recharts'],
                    'socket-video': ['socket.io-client', '@videosdk.live/react-sdk'],
                },
            },
        },
        // Chunk size warning limit
        chunkSizeWarningLimit: 1000,
        // Minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    // Optimize dependencies
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'axios',
            'zustand',
        ],
    },
})
