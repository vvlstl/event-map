<template>
	<div class="info-events">
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

	type TComponentProps = {
		items: TEventCard[];
	}

	const props = defineProps<TComponentProps>();
</script>

