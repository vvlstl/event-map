<template>
	<div class="app">
		<InfoEvents :items="eventItems" class="app__info-event"/>
		<Map :markers="eventItems" class="app__map"/>
	</div>
	<ModalsContainer/>
</template>
<script setup lang="ts">
	import Map from "~/js/components/Map.vue";
	import InfoEvents from "~/js/components/info-events/InfoEvents.vue";
	import {InfoEventsData} from "~/markupdata/InfoEventsData";

	const eventItems = InfoEventsData.getMockEvents(5);

</script>
