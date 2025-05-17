<template>
	<label class="checkbox">
		<input
			type="checkbox"
			class="checkbox__input"
			v-bind="field.attrs"
			:value="field.value"
			v-model="modelValue"
		/>
		<span class="checkbox__label" v-html="field.label"/>
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
