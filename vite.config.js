import * as path from 'path';
import handlebars from 'vite-plugin-handlebars';
import { glob } from 'glob';

const srcDir = 'src'

// search html files
const htmlGlob = glob.sync(`${srcDir}/**/*.html`, {
    ignore: `${srcDir}/index.html`,
}).map(key => [key.replace('src/', ''), path.resolve(__dirname, key)])

const rollupOptionsInput = {
    main: path.resolve(__dirname, srcDir, 'index.html'),
    ...Object.fromEntries(htmlGlob)
}

export default {
    root: srcDir,
    publicDir: 'public',
    build: {
        outDir: '../dist', // PATHはindex.htmlが基準
        emptyOutDir: true,
        rollupOptions: {
            input: rollupOptionsInput,
        }
    },
    plugins: [
        handlebars({
            reloadOnPartialChange: true,
            partialDirectory: path.resolve(__dirname, srcDir, 'partials'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};
