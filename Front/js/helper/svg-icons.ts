declare const require: {
    context: (
        path: string,
        deep?: boolean,
        filter?: RegExp
    ) => {
        keys: () => string[];
        (id: string): any;
    };
};

// Импорт всех SVG
const importAll = (r: ReturnType<typeof require.context>) => {
    r.keys().forEach(r);
};

importAll(require.context('~/images/symbol', false, /\.svg$/));

// Экспорт имен иконок
export const iconNames = require.context('~/images/symbol', false, /\.svg$/)
    .keys()
    .map(path => path.replace('./', '').replace('.svg', ''));