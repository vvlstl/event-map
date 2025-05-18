<template>
	<FormWrapper
		:form-data="formData"
		:form="form"
		class="search-form"
	>
		<InputWrap
			:hide-label="true"
			:field="formData.fields.query"
			:controller="form.query"
			class="search-form__field"
		>
			<FormInput
				:field="formData.fields.query"
				v-model="form.query.value"
				ref="formInputInstance"
			/>

			<div class="search-form__input-icon">
				<SvgSymbol name="search"/>
			</div>

			<button
				type="submit"
				class="btn search-form__submit"
			>
				<span class="btn__icon">
					<SvgSymbol name="calendar"/>
				</span>

				<span class="btn__text">Когда</span>
			</button>
		</InputWrap>
	</FormWrapper>

</template>
<script setup lang="ts">
	import SvgSymbol from "~/js/components/common/SvgSymbol.vue";
	import FormWrapper from "~/js/components/form/FormWrapper.vue";
	import InputWrap from "~/js/components/form/ field/InputWrap.vue";
	import FormInput from "~/js/components/form/ field/FormInput.vue";
	import TForm from "~/js/controllers/form/type/TForm";
	import TFieldController from "~/js/controllers/form/type/TFieldController";
	import {computed, ref} from "vue";
	import formController from "~/js/controllers/form";

	//TODO для верстки
	const formData: TForm = {
		fields: {
			query: {
				name: 'query',
				value: '',
				label: 'Поиск',
				attrs: {
					placeholder: 'Поиск',
				},
			}
		},
		attrs: {},
		options: {},
	}

	const emit = defineEmits(['close']);

	const form = formController<{
		query: TFieldController<string>,
	}>(formData.fields, {});

	const formInputInstance = ref<null | InstanceType<typeof FormInput>>(null);

	const input = computed(() => {
		return formInputInstance.value?.input;
	});

	function clear() {
		form.query.value = '';
		emit('close');
	}

	defineExpose({
		input: input,
	});


</script>