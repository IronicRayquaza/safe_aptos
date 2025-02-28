// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'
// // import tailwindcss from '@tailwindcss/vite'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [tailwindcss(),react()],
// // })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import tailwindcss from '@tailwindcss/vite';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(),react()],
//   resolve: {
//     alias: {
//       global: 'global',
//       buffer: 'buffer',
//       stream: 'stream-browserify', // Add stream polyfill
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'window', // Polyfill for WalletConnect
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           process: true,
//           buffer: true,
//         }),
//       ],
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'; // Polyfills for Buffer, Stream, etc.
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(),react()],
  resolve: {
    alias: {
      global: 'global',
      buffer: 'buffer',
      stream: 'stream-browserify', // Stream polyfill
      process: 'process/browser',  // Process polyfill
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window', // Fix WalletConnect issues
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // Polyfill Node.js modules
      ],
    },
  },
});
