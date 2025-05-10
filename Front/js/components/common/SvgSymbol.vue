<template>
	<svg
		class="symbol"
		@click="$emit('click')"
		:class="[`symbol-${name}`]">
		<use class="symbol__use" :xlink:href="`${SYMBOLS_SVG}#${name}`"></use>
	</svg>
</template>

<script setup lang="ts">
	import {SYMBOLS_SVG} from "~/js/helper/const";

	defineProps({
		name: String,
	});

</script>
