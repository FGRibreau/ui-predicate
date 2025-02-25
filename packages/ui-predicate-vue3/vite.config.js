import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

const isGettingStarted = process.env.VITE_APP === 'GETTING_STARTED';

const defaultConfig = {
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

// https://vitejs.dev/config/
// export default defineConfig(viteConfig)
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    if (isGettingStarted) {
      return {
        ...defaultConfig,
        root: path.resolve(__dirname,  './getting-started'),
        build: {
          rollupOptions: {
            input: {
              main: path.resolve(__dirname, './getting-started/simple.js'),
            },
          },
        },
      }
    }
    return defaultConfig
  } else {
    // command === 'build'
    if (isGettingStarted) {
      return {
        ...defaultConfig,
        root: path.resolve(__dirname,  'getting-started'),
        build: {
          rollupOptions: {
            input: {
              main: path.resolve(__dirname, './getting-started/index.html'),
            },
          },
        },
      }
    }
    return {
      ...defaultConfig,
      build: {
        manifest: true,
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),
          name: 'UIPredicateVue3',
          fileName: (format) => `ui-predicate-vue3.${format}.js`,
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      }
    }
  }
})
