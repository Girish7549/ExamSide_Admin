import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(() => {
  return {
    base: './', // Ensure assets are linked relatively
    build: {
      outDir: 'dist', // Change output directory to 'dist' (Vercel expected default)
      rollupOptions: {
        output: {
          // Manual chunking for better splitting of dependencies
          manualChunks(id) {
            // If it's from node_modules, bundle it separately into a vendor chunk
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase the warning limit (to 1MB)
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // Add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/, // Specify files to transpile with esbuild
      exclude: [], // Exclude none, you can define exclusions if needed
    },
    optimizeDeps: {
      force: true, // Force Vite to pre-optimize dependencies
      esbuildOptions: {
        loader: {
          '.js': 'jsx', // Specify .js files to use JSX loader
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/', // Custom alias for 'src' directory
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000, // Set development server port
      proxy: {
        // Add proxy configurations if needed for API calls
      },
    },
  }
})
