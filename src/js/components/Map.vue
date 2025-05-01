<template>
	<div id="map"></div>
</template>

<script setup lang="ts">
	import {onMounted} from 'vue';
	import {MapManager} from "~/js/models/MapManager";

	onMounted(() => {
		new MapManager('map');
	});
</script>