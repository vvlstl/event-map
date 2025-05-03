export const BREAKPOINTS = {
    xs: 480,
    sm: 768,
    md: 1024,
    lg: 1240,
    xl: 1440,
    xxl: 1940,
};

const svgHash = getComputedStyle(document.documentElement).getPropertyValue('--sh').replaceAll('"', '');

export const SYMBOLS_SVG: string = '/local/build/symbols.svg?' + svgHash;
