import crypto from 'crypto';
import { config as loadEnv } from 'dotenv';
import * as esbuild from 'esbuild';
import CssModulesPlugin from 'esbuild-css-modules-plugin';
import fs from 'fs';
import path from 'path';

const { parsed: ENV } = loadEnv();

const isDevMode = process.argv.includes('--dev');

const deleteFolderRecursive = (directoryPath) => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

const areFilesEqual = async (file1Path, file2Path) => {
  const hash1 = crypto.createHash('sha256');
  const hash2 = crypto.createHash('sha256');

  const [data1, data2] = await Promise.all([
    fs.promises.readFile(file1Path),
    fs.promises.readFile(file2Path),
  ]);

  hash1.update(data1);
  hash2.update(data2);

  return hash1.digest('hex') === hash2.digest('hex');
};

let rebuildCounter = 0;
let sentChangeEventToFrontend = () => {};
let isFirstBuild = true;
const consolePrinter = {
  name: 'consolePrinter',
  setup(build) {
    build.onStart(() => {
      if (isDevMode) {
        console.log('Rebuild #' + rebuildCounter++);
      }
      console.log('Building...');

      if (!isFirstBuild) {
        if (!fs.existsSync('oldDist')) {
          fs.mkdirSync('oldDist');
        }
        fs.cpSync('dist/bundle.css', 'oldDist/bundle.css');
        fs.cpSync('dist/bundle.js', 'oldDist/bundle.js');
      }

      deleteFolderRecursive('dist');
      fs.mkdirSync('dist');

      fs.cpSync('src/public', 'dist', {
        'recursive': true,
      });

      if (!isFirstBuild) {
        fs.cpSync('oldDist', 'dist/oldDist', {
          'recursive': true,
        });
        deleteFolderRecursive('oldDist');
      }
    });

    build.onEnd(async (result) => {
      if (result.errors.length) {
        console.log(`\nFound ${result.errors.length} errors.`);
        return;
      }

      if (!isFirstBuild) {
        sentChangeEventToFrontend();
      }

      console.log(`Server on http://localhost:${process.env.PORT || 3000}\n`);
      isFirstBuild = false;
    });
  },
};

const context = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: process.env.ambient === 'production',
  sourcemap: process.env.ambient !== 'production',
  outfile: 'dist/bundle.js',
  define: {
    'process.env': JSON.stringify(ENV || {}),
  },
  plugins: [
    CssModulesPlugin(),
    consolePrinter,
  ],
});

if (isDevMode) {
  import('./server.js').then(({ clients }) => {
    sentChangeEventToFrontend = async () => {
      const hasChangesOnCSS = !await areFilesEqual('dist/bundle.css', 'dist/oldDist/bundle.css');
      const hasChangesOnJS = !await areFilesEqual('dist/bundle.js', 'dist/oldDist/bundle.js');

      clients.forEach((client) => {
        client.write(`id: ${Math.random()}\n`);
        client.write('event: custom\n');
        client.write(`data: ${JSON.stringify({ hasChangesOnCSS, hasChangesOnJS })}\n\n`);
      });
    };
    context.watch();
  });
}
