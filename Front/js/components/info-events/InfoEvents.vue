<template>
	<div class="info-events">
		<div class="info-events__header">
			<SearchForm/>
		</div>
		<EventCard
			class="info-events__items"
			v-for="item in items"
			:item="item"
			:key="item.id"
		/>
	</div>
</template>
<script setup lang="ts">
	import {TEventCard} from "~/types/TEventCard";
	import EventCard from "~/js/components/info-events/EventCard.vue";
	import SearchForm from "~/js/components/form/SearchForm.vue";

	type TComponentProps = {
		items: TEventCard[];
	}

	const props = defineProps<TComponentProps>();
</script>

