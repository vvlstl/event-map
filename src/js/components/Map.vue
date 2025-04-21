<template>
	<div id="map" style="height: 400px;"></div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import Leaflet from "leaflet";

	onMounted(() => {
		const map = Leaflet.map('map').setView([55.751244, 37.618423], 12); // Москва

		Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: '© Esri Satellite',
			maxZoom: 19
		}).addTo(map);
	});
</script>