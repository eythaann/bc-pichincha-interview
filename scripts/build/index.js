import * as esbuild from 'esbuild';
import CssModulesPlugin from 'esbuild-css-modules-plugin';
import { cpSync } from 'fs';

cpSync('src/public', 'dist', {
  'recursive': true,
});

const consolePrinter = {
  name: 'consolePrinter',
  setup(build) {
    build.onStart(() => {
      console.clear();
      console.log('Starting server...');
    });

    build.onEnd((result) => {
      if (result.errors.length) {
        console.log(`\nFound ${result.errors.length} errors.`);
      } else {
        console.log('Server on: http://localhost:3000');
      }
    });
  },
};

const context = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'dist/bundle.js',
  plugins: [
    CssModulesPlugin(),
    consolePrinter,
  ],
});

await context.watch();

await context.serve({
  port: 3000,
  servedir: './dist',
  fallback: './dist/index.html',
});