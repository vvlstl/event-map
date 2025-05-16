<template>
	<Multiselect
		v-bind="settings"
		:options="field.valueOptions"
		v-model="modelValue"
		@multiselect-focus="onFocus"
		ref="input"
	>
		<template #caret>
			<div class="multiselect-arrow">
				<SvgSymbol name="caret" />
			</div>
		</template>
	</Multiselect>
</template>

<script setup lang="ts">

	import Multiselect from '@vueform/multiselect';
	import TField from '~/js/controllers/form/type/TField';
	import {ref} from 'vue';
	import SvgSymbol from "~/js/components/common/SvgSymbol.vue";

	type TComponentProps = {
		field: TField,
	};

	const props = defineProps<TComponentProps>();

	const input = ref<null | HTMLElement>(null);

	const modelValue = defineModel();

	const settings = {
		...props.field.attrs,
		noOptionsText: 'Список пуст',
		noResultsText: 'Элементы не найдены',
		mode: props.field.attrs?.multiple ? 'multiple' : 'single',
		hideSelected: !props.field.attrs?.multiple,
		closeOnSelect: !props.field.attrs?.multiple,
		canClear: false,
		canDeselect: !props.field.attrs?.required && !props.field.attrs?.multiple,
		searchable: false,
	};

	function onFocus() {
		if (!input.value?.$el) return;

		input.value.$el.focus();

		if (input.value.$el.closest('.input-wrap--error')) {
			input.value.open();
		}

		//input.value.$el.scrollIntoView();
	}

</script>
