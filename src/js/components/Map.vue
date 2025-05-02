<template>
	<div id="map" class="map"/>
</template>

<script setup lang="ts">
	import {onMounted} from 'vue';
	import {MapManager} from "~/js/models/MapManager";
	import {TMarker} from "~/types/TMarker";

	type TComponentProps = {
		markers: TMarker[];
	}

	const props = defineProps<TComponentProps>();

	onMounted(() => {
		const map = new MapManager('map');

		map.addMarkers(props.markers)
	});
</script>