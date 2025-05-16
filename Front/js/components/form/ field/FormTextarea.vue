<template>
    <textarea
	    class="textarea"
	    v-bind="field.attrs"
	    v-model="modelValue"
    ></textarea>
</template>


<script setup lang="ts">

	import TField from '~/js/controllers/form/type/TField';

	type TComponentProps = {
		field: TField,
	};

	const props = defineProps<TComponentProps>();

	const modelValue = defineModel();

</script>
