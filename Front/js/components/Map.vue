<template>
	<div id="map" class="map"/>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
	import { MapManager } from "~/models/MapManager";
	import EventBus from "~/js/helper/event-bus";
	import { LatLng } from "leaflet";
	import { TEventCard } from "~/types/TEventCard";

	type TComponentProps = {
		markers: TEventCard[];
	};

	const props = defineProps<TComponentProps>();
	const map = ref<MapManager | null>(null);
	const isMapReady = ref(false);

	const mapMarkers = computed(() => {
		return props.markers.map((event: TEventCard) => ({
			lat: event.lat,
			lng: event.lng,
		}));
	});

	type TMapData = {
		latlng: LatLng;
	};

	function handleMapClick(data: TMapData) {
		if (!map.value || !isMapReady.value) return;
		map.value.showPopupAt(data.latlng, "You clicked the map at " + data.latlng.toString());
	}

	function handleMarkerClick(data: TMapData) {
		if (!map.value || !isMapReady.value) return;

		const epsilon = 0.000001;
		const clickedMarker = props.markers.find((item: TEventCard) =>
			Math.abs(item.lat - data.latlng.lat) < epsilon &&
			Math.abs(item.lng - data.latlng.lng) < epsilon
		);

		map.value.onMarkerClick(data.latlng, clickedMarker);
	}

	onMounted(() => {
		map.value = new MapManager('map');
		map.value.init().then(() => { // Предположим, что MapManager имеет асинхронный init()
			isMapReady.value = true;
			map.value?.addMarkers(mapMarkers.value);
		});

		EventBus.on('click-to-map', handleMapClick);
		EventBus.on('click-to-marker', handleMarkerClick);
	});

	onBeforeUnmount(() => {
		EventBus.off('click-to-map', handleMapClick);
		EventBus.off('click-to-marker', handleMarkerClick);

		// Уничтожаем карту
		if (map.value) {
			map.value.destroy();
			map.value = null;
		}
		isMapReady.value = false;
	});
</script>