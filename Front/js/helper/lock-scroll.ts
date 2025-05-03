import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { ref } from 'vue';
import Detector from "~/js/helper/detector";

document.documentElement.style.setProperty('--scroll-lock-compensation', '0px');

let lockedCount = ref<number>(0);

export function lockScroll(lock: boolean, targetElement: HTMLElement | null) {
    if (lock) {
        lockedCount.value++;

        if (lockedCount.value === 1) {
            document.body.style.setProperty('top', -window.scrollY + 'px');
            document.documentElement.style.setProperty('--scroll-lock-compensation', `${Detector.scrollbarWidth}px`);
        }

        if (targetElement) {
            disableBodyScroll(targetElement, {
                allowTouchMove: (el: HTMLElement) => !!el.closest('[data-scroll-lock-scrollable]'),
            });
        }

    } else {
        lockedCount.value--;

        if (targetElement) {
            enableBodyScroll(targetElement);
        } else {
            clearAllBodyScrollLocks();
        }

        if (lockedCount.value < 1) {
            const scrollY = document.body.style.top;
            document.body.style.removeProperty('top');
            document.documentElement.style.setProperty('--scroll-lock-compensation', '0px');
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
}