<template>
	<div
		class="info-events"
	>
		<div class="info-events__top">
			<div class="info-events__title">СУЕТА!</div>
		</div>

		<div class="info-events__content custom-scrollbar custom-scrollbar--hidden">

			<div class="info-events__today">
				<div class="info-events__count">Событий в городе <b>{{ items.length }}</b></div>
				<SearchForm/>
				<div class="info-events__categories">
					<CategoryCard
						v-for="(categoryItem, index) in categoryCard"
						:item="categoryItem"
						:key="index"
					/>
				</div>
			</div>

			<div class="info-events__list">
				<div class="info-events__list-title">куда сходить <b>{{ toDayDate }}</b></div>
				<div class="info-events__list-items">
					<EventCard
						class="info-events__item"
						v-for="item in items"
						:item="item"
						:key="item.id"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {TEventCard} from "~/types/info-events/TEventCard";
	import EventCard from "~/js/components/info-events/EventCard.vue";
	import SearchForm from "~/js/components/form/SearchForm.vue";
	import {ref} from "vue";
	import CategoryCard from "~/js/components/info-events/CategoryCard.vue";
	import {CategoryCardData} from "~/markupdata/CategoryCardData";
	import {TCategoryCard} from "~/types/info-events/TCategoryCard";

	type TComponentProps = {
		items: TEventCard[];
		open?: boolean,
	}

	const props = defineProps<TComponentProps>();

	const toDayDate = new Date().toLocaleString('ru-RU', {day: 'numeric', month: 'long'})

	const isOpen = ref<boolean>(props.open ?? false);

	function toggle(state?: any) {
		if (typeof state !== 'boolean') state = !isOpen.value;

		isOpen.value = state;
	}

	const categoryCard: TCategoryCard[] = CategoryCardData.getCategoryCard();

</script>

