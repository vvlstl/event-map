<template>
	<input
		class="input"
		:type="field.attrs?.type ?? 'text'"
		v-bind="field.attrs"
		v-maska="maskOptions"
        @input="emit('update:modelValue', $event.target.value)"
		ref="input"
	>
</template>


<script setup lang="ts">

	import {computed, ref} from 'vue';
	import TField from '~/js/controllers/form/type/TField';
	import type { MaskInputOptions } from 'maska';
	import { vMaska } from 'maska/vue';

	type TComponentProps = {
		field: TField,
        modelValue: string,
	};

    const emit = defineEmits(['update:modelValue']);
	const props = defineProps<TComponentProps>();

	const maskOptions = computed((): MaskInputOptions | null => {
		return props.field.options?.mask ?? null;
	});

	const input = ref<null | HTMLInputElement>(null);

	defineExpose({
		input: input,
	});

</script>
