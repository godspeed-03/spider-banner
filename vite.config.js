import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'SpiderBanner',
      fileName: (format) => `spider-banner.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
};
