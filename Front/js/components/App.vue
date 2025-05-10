<template>
	<div class="app">
		<Map :markers="eventItems"/>
		<InfoEvents :items="eventItems"/>
	</div>
	<ModalsContainer/>
</template>
<script setup lang="ts">
	import Map from "~/js/components/Map.vue";
	import InfoEvents from "~/js/components/info-events/InfoEvents.vue";
	import {InfoEventsData} from "~/markupdata/InfoEventsData";

	const eventItems = InfoEventsData.getMockEvents(5);

</script>
