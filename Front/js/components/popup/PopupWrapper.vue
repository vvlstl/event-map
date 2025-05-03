<template>
	<VueFinalModal
		v-slot="{ close }"
		v-bind="$attrs"
		class="popup"
		:class="{
            ['popup--' + type]: type,
        }"
		:classes="{
            'popup__container': true,
            'custom-scrollbar': true,
            'body-scroll-lock-ignore': true,
            [type + '-popup']: type,
        }"
		:content-class="{
            'popup__content': true,
            [type + '-popup__content']: type,
        }"
		overlay-class="popup__overlay"
		:focus-trap="true"
		:esc-to-close="true"
		:name="name"
		@before-open="onBeforeOpen"
		@closed="onClosed"
		ref="popupElement"
	>
		<button @click="close" class="cross link popup__close"></button>

		<slot/>

	</VueFinalModal>
</template>

<script setup lang="ts">

	import {ref} from 'vue';
	import {VueFinalModalComponent} from 'vue-final-modal';
	import {lockScroll} from "~/js/helper/lock-scroll";

	type TComponentProps = {
		name?: string,
		type?: string,
	};

	const props = defineProps<TComponentProps>();
	const popupElement = ref<null | VueFinalModalComponent>(null);

	function onBeforeOpen() {
		lockScroll(true, popupElement.value?.$el);
	}

	function onClosed() {
		lockScroll(false, popupElement.value?.$el);
	}


</script>
