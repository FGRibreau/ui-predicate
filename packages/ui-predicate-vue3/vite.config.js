import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

const isGettingStarted = process.env.VITE_APP === 'GETTING_STARTED';

const viteConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'UIPredicateVue3',
      fileName: (format) => `ui-predicate-vue3.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      'ui-predicate-core': path.resolve(__dirname, './node_modules/ui-predicate-core/src/index.js')
    }
  },
  define: {
    'process.env': {}
  },
  plugins: [vue()],
}

if (isGettingStarted) {
  viteConfig.root = path.resolve(__dirname,  './getting-started');
  viteConfig.build.rollupOptions.input = {
    main: path.resolve(__dirname, 'simple.js'),
  };
}

// https://vitejs.dev/config/
export default defineConfig(viteConfig)
