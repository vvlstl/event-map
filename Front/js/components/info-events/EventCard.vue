<template>
	<div
		class="event-card"
		@click="openPopup"
	>
		<div class="event-card__header">
			<div class="event-card__info">
				<div
					class="event-card__category label"
					:style="`--label-bg-color: ${item.label.color}`"
				>
					<div class="label__icon">
						<SvgSymbol :name="item.label.code"/>
					</div>
					<div class="label__text" v-html="item.label.text"/>
				</div>
				<div v-if="item.tags?.length" class="event-card__tags">
					<span
						v-for="(tag, index) in item.tags.slice(0, 2)"
						v-html="tag"
						:key="index"
					/>
				</div>
			</div>
			<div class="event-card__title" v-html="item.name"/>
		</div>

		<div class="event-card__main">
			<div v-if="item.picture" class="event-card__picture">
				<VuePicture v-bind="item.picture"/>
			</div>

			<div class="event-card__text" v-html="item.previewText"/>
			<div class="event-card__footer">
				<span>Подробнее</span>
				<span class="event-card__more-icon"><SvgSymbol name="more"/></span>
			</div>

		</div>
	</div>
</template>
<script setup lang="ts">
	import {TEventCard} from "~/types/info-events/TEventCard";
	import {show} from "~/js/controllers/popup";
	import VuePicture from "~/js/components/common/VuePicture.vue";
	import SvgSymbol from "~/js/components/common/SvgSymbol.vue";

	type TComponentProps = {
		item: TEventCard,
	}

	const props = defineProps<TComponentProps>();

	function openPopup() {
		if (!props.item) return;
		show('event', {item: props.item});
	}
</script>

