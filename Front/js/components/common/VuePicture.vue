<template>
	<img
		v-if="src"
		:src="src"
		:alt="alt"
		:title="title"
		:loading="loading"
	/>
</template>

<script setup lang="ts">

	import {TPicture} from '~/types/TPicture';

	export type TComponentProps = TPicture;

	const props = withDefaults(defineProps<TComponentProps>(), {
		loading: 'lazy',
	});

</script>
