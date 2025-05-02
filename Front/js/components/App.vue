<template>
	<div class="app">
		<Map :markers="mapMarkers"/>
		<InfoEvents :items="eventItems"/>
	</div>
</template>
<script setup lang="ts">
	import Map from "~/js/components/Map.vue";
	import InfoEvents from "~/js/components/info-events/InfoEvents.vue";
	import {InfoEventsData} from "~/markupdata/InfoEventsData";
	import {computed} from "vue";

	const eventItems = InfoEventsData.getMockEvents(5);
	const mapMarkers = computed(() => {
		return eventItems.map(event => ({
			lat: event.lat,
			lng: event.lng
		}));
	});
</script>
