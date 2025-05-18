<template>
	<PopupWrapper
		type="event"
		class-content="custom-scrollbar custom-scrollbar--hidden"
	>
		<div class="event-popup__header">
			<div class="event-popup__info">
				<div
					class="event-popup__category label"
					:style="`--label-bg-color: ${item.label.color}`"
				>
					<div class="label__icon">
						<SvgSymbol :name="item.label.code"/>
					</div>
					<div class="label__text" v-html="item.label.text"/>
				</div>
				<div v-if="item.tags?.length" class="event-popup__tags">
					<span
						v-for="(tag, index) in item.tags.slice(0, 2)"
						v-html="tag"
						:key="index"
					/>
				</div>
			</div>
			<div class="event-popup__title" v-html="item.name"/>
		</div>
		<div class="event-popup__main">
			<div v-if="item.picture" class="event-popup__picture">
				<VuePicture v-bind="item.picture"/>
			</div>
			<div class="event-popup__text" v-html="markedText"/>
		</div>
	</PopupWrapper>

</template>
<script setup lang="ts">
	import PopupWrapper from "~/js/components/popup/PopupWrapper.vue";
	import VuePicture from "~/js/components/common/VuePicture.vue";
	import SvgSymbol from "~/js/components/common/SvgSymbol.vue";
	import {TEventCard} from "~/types/info-events/TEventCard";
	import {marked} from "marked";
	import {computed} from "vue";

	type TComponentProps = {
		item: TEventCard,
	}

	const props = defineProps<TComponentProps>();

	const markedText = computed(()=>{
		return marked(props.item.detailText)
	});
</script>

