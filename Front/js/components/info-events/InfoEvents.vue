<template>
	<div
		class="info-events"
	>
		<div class="info-events__top">
			<div class="info-events__title">суета!</div>
		</div>

		<div class="info-events__content custom-scrollbar custom-scrollbar--hidden">

			<div class="info-events__today">
				<div class="info-events__count">Событий в городе <b>{{ items.length }}</b></div>
				<SearchForm @input="emit('queryInput', $event)"/>
				<div class="info-events__categories">
					<CategoryCard
						v-for="(categoryItem, index) in categoryCards"
						:item="categoryItem"
						:key="index"
                        @click="emit('filterByCategory', $event)"
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
    import {onMounted, ref} from "vue";
	import CategoryCard from "~/js/components/info-events/CategoryCard.vue";
	import {TCategoryCard} from "~/types/info-events/TCategoryCard";
    import {api} from '~/js/helper/api';

	type TComponentProps = {
		items: TEventCard[];
		open?: boolean,
	}

    const emit = defineEmits(['filterByCategory', 'queryInput']);
	const props = defineProps<TComponentProps>();

	const toDayDate = new Date().toLocaleString('ru-RU', {day: 'numeric', month: 'long'})

	const isOpen = ref<boolean>(props.open ?? false);

	function toggle(state?: any) {
		if (typeof state !== 'boolean') state = !isOpen.value;

		isOpen.value = state;
	}

	const categoryCards = ref<TCategoryCard[]>([]);

    onMounted(async () => {
        const response = await api().getCategoryList();

        if (response.success) {
            categoryCards.value = response.data;
        }
    })

</script>

