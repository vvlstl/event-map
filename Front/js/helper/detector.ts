import {BREAKPOINTS} from "~/js/helper/const";


export function checkWebpSupport(): boolean {
    // SSR
    if (typeof window === 'undefined') {
        return false;
    }

    let webpSupported;
    const element = document.createElement('canvas');

    if (element.getContext && element.getContext('2d')) {
        webpSupported = element.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        webpSupported = false;
    }

    return webpSupported;
}

const hasWebpSupport = checkWebpSupport();

const Detector = {
    get isXs(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.xs : false;
    },

    get isSm(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.sm : false;
    },

    get isMd(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.md : false;
    },

    get isLg(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.lg : false;
    },

    get isXl(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.xl : false;
    },

    get isXxl(): boolean {
        return typeof window !== 'undefined' ? window.innerWidth < BREAKPOINTS.xxl : false;
    },

    get isSmHeight(): boolean {
        return typeof window !== 'undefined' ? window.innerHeight < BREAKPOINTS.sm : false;
    },

    get isTouch(): boolean {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            ((navigator as any).msMaxTouchPoints > 0);
    },

    get userAgent(): string {
        return navigator !== undefined ? navigator.userAgent : '';
    },

    get vendor(): string {
        return (navigator !== undefined ? navigator?.vendor : '') || '';
    },

    get getWindowHeight(): number {
        return window.innerHeight;
    },

    get getOrientation(): string {
        return window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical';
    },

    get hasWebpSupport(): boolean {
        return hasWebpSupport;
    },

    get scrollbarWidth(): number {
        return Math.round(window.innerWidth - document.documentElement.clientWidth);
    },

    get isSlowNetwork(): boolean {
        const slowTypes = ['slow-2g', '2g', '3g'] as const;
        const connection = (navigator as { connection?: { effectiveType: string } }).connection;
        const networkType = connection?.effectiveType ?? '';
        return slowTypes.includes(networkType as typeof slowTypes[number]);
    },
};

export default Detector;
