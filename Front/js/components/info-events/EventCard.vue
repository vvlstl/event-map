<template>
	<div
		class="event-card"
		@click="openPopup"
	>
		<div class="event-card__image">
			<VuePicture v-bind="item.picture"/>
		</div>
		<div class="event-card__content">
			<div class="event-card__title" v-html="item.name"/>
			<div class="event-card__description" v-html="item.description"/>
			<div class="event-card__details">
				<span class="event-card__address" v-html="item.address"/>
				<span class="event-card__date" v-html="item.date"/>
			</div>
			<div class="event-card__tag" v-html="item.source"/>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {TEventCard} from "~/types/TEventCard";
	import {show} from "~/js/controllers/popup";
	import VuePicture from "~/js/components/common/VuePicture.vue";

	type TComponentProps = {
		item: TEventCard,
	}

	const props = defineProps<TComponentProps>();

	function openPopup() {
		show('event', {
			title: props.item.name,
			text: props.item.description,
			picture: props.item.picture,
		});
	}
</script>

