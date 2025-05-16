<template>
	<form
		class="form"
		v-bind="formData.attrs"
		@submit.prevent="submitForm"
		ref="root"
	>
		<slot
			name="form-content"
			:submit-form="submitForm"
		>
			<slot
				name="header"
				v-if="$slots.header"
			>
				<div class="form__header">
					<div v-if="formData.options?.title" class="form__title" v-html="formData.options.title"></div>
					<div v-if="formData.options?.text" class="form__text text-content" v-html="formData.options.text"></div>
				</div>
			</slot>

			<slot name="content">
				<div class="form__fields">
					<slot />
				</div>
			</slot>

			<slot
				name="footer"
				v-if="$slots.footer"
			>
				<div class="form__footer">
					<button
						type="submit"
						class="btn btn--dark-blue btn--lg form__submit"
						@click.prevent="submitForm"
					>
						<span class="btn__text" v-html="formData.options?.submitText ?? 'Отправить форму'"></span>
						<span class="btn__icon form__submit-icon"><SvgSymbol name="arrow-more" /></span>
					</button>

					<div
						v-if="formData.options?.policy"
						class="form__policy text-content"
						v-html="formData.options.policy"
					/>
				</div>
			</slot>
		</slot>
	</form>
</template>

<script setup lang="ts">

	import TForm from '~/js/controllers/form/type/TForm';
	import TFormController from '~/js/controllers/form/type/TFormController';
	import {onMounted, ref} from 'vue';
	import {INPUT_SELECTOR} from '~/js/helper/const';
	import {focusInput} from '~/js/helper/common';

	type TComponentProps = {
		formData: TForm,
		form: TFormController,
	};

	const props = defineProps<TComponentProps>();
	const root = ref<HTMLFormElement | null>(null);

	function focusFirstErrorInput() {
		const firstInput = root.value?.querySelector('.input-wrap--error ' + INPUT_SELECTOR);

		if (firstInput) focusInput(firstInput as HTMLInputElement);
	}

	function focusFirstInput() {
		const firstInput = root.value?.querySelector(INPUT_SELECTOR);

		if (firstInput) focusInput(firstInput as HTMLInputElement);
	}

	function submitForm() {
		props.form.validation();

		setTimeout(() => {
			focusFirstErrorInput();
		}, 500);
	}

	onMounted(() => {
		if (root.value?.closest('.popup')) {
			focusFirstInput();
		}
	});

</script>
