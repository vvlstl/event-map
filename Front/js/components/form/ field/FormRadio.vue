<template>
	<label class="radio">
		<input
			type="radio"
			class="radio__input"
			v-bind="field.attrs"
			:value="field.value"
			v-model="modelValue"
		/>
		<span class="radio__label" v-html="field.label"/>
	</label>
</template>


<script setup lang="ts">

	import TField from '~/js/controllers/form/type/TField';

	type TComponentProps = {
		field: TField,
	};

	const props = defineProps<TComponentProps>();

	const modelValue = defineModel();

</script>
