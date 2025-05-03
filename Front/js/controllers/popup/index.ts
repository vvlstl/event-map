import {Component} from 'vue';
import {$vfm} from 'vue-final-modal';
import EventInfoPopup from "~/js/components/popup/EventInfoPopup.vue";

export const PopupMap = {
    event: EventInfoPopup
} as const;

type dynamicModalOptions = {
    component?: string | Component // modal component
    bind?: { [key: string]: any }, // bind props and attrs to modal
    on?: { [key: string]: Function | Function[] } // register events to modal
}

function showPopup(options: dynamicModalOptions): Promise<void> {
    return $vfm.show(options);
}

export function show(component: Component | keyof typeof PopupMap, props?: dynamicModalOptions['bind'], events?: dynamicModalOptions['on']): Promise<void> {
    if (typeof component === 'string') {
        component = PopupMap[component] as Component;
    }

    return showPopup({
        component: component,
        bind: props,
        on: events,
    });
}

/**
 * Закрыть все попапы
 */
export function hideAll() {
    return $vfm.hideAll();
}

/**
 * Закрыть только верхний попап
 */
export function hideTop() {
    const len = $vfm.openedModals.length;
    if (len === 0) return;

    // @ts-ignore
    return $vfm.openedModals[len - 1].toggle(false);
}

/*
 * Закрыть попап по идентификатору
 */
export function hide(name: string) {
    return $vfm.hide(name);
}