<template>
	<PopupWrapper type="event">
		<div class="event-popup__header">
			<div class="event-popup__title" v-html="title"/>
		</div>
		<div class="event-popup__main">
			<div class="event-popup__picture">
				<VuePicture v-bind="picture"/>
			</div>
			<div class="event-popup__text" v-html="text"/>
		</div>
		<div class="event-popup__footer">
			<button class="btn">
				<span class="btn__text">Маршрут</span>
			</button>
		</div>
	</PopupWrapper>

</template>
<script setup lang="ts">
	import PopupWrapper from "~/js/components/popup/PopupWrapper.vue";
	import {TPicture} from "~/types/TPicture";
	import VuePicture from "~/js/components/common/VuePicture.vue";

	type TComponentProps = {
		title: string,
		text: string,
		picture: TPicture,
	}

	const props = defineProps<TComponentProps>();
</script>

