<template>
	<div
		class="input-wrap"
		:class="{
            'input-wrap--error': isError,
            'input-wrap--has-value': hasValue && hasLabel,
            'input-wrap--focus': hasFocus && hasLabel,
        }"
		ref="root"
	>
		<div
			class="input-wrap__input"
			@focus.capture="onFocus"
			@blur.capture="onBlur"
		>
			<label
				v-if="hasLabel"
				class="input-wrap__label"
				:for="field.attrs?.id?.toString()"
			>
                <span class="input-wrap__label-text-wrap">
                    <span class="input-wrap__label-text" v-html="field.label"></span>
                    <span v-if="field.attrs?.required" class="input-wrap__label-required"></span>
                </span>
			</label>

			<slot name="default"></slot>
		</div>

		<label
			v-if="errorMessage"
			class="input-wrap__message"
			:for="field?.attrs?.id?.toString()"
		>
            <span
	            class="input-wrap__error"
	            v-html="errorMessage"
            ></span>
		</label>
	</div>
</template>

<script setup lang="ts">

	import {computed, onMounted, ref,  watch} from 'vue';
	import TField from '~/js/controllers/form/type/TField';
	import TFieldController from '~/js/controllers/form/type/TFieldController';
	import {INPUT_SELECTOR} from '~/js/helper/const';

	type TComponentProps = {
		field: TField,
		controller?: TFieldController,
		hideLabel?: boolean,
		hideErrorLabel?: boolean,
	};

	const props = defineProps<TComponentProps>();
	const root  = ref<null | HTMLInputElement | undefined>(null);

	const hasValue = ref<boolean>(false);
	const hasFocus = ref<boolean>(false);
	const input = ref<HTMLElement | null>(null);

	const isError = computed(() => {
		return props.controller?.validator && !props.controller.validator.valid;
	});

	const errorMessage = computed(() => {
		return !props.hideErrorLabel && props.controller?.validator.message;
	});

	const hasLabel = computed(() => {
		return props.field?.label && !props.hideLabel;
	});

	function checkValue() {
		const newValue = props.controller?.value;

		hasValue.value = newValue !== undefined && newValue !== null && (typeof newValue !== 'string' || newValue.length > 0);
	}

	function onFocus() {
		hasFocus.value = true;
	}

	function onBlur() {
		hasFocus.value = false;
	}

	const inputListeners = {
		focus: onFocus,
		blur: onBlur,
	};

	watch(() => props.controller?.value, checkValue);

	function updateInput() {
		const newInput = <HTMLElement | null> root.value?.querySelector(INPUT_SELECTOR);

		if (input.value) {
			for (let event in inputListeners) {
				input.value.removeEventListener(event, inputListeners[event]);
			}
		}

		if (newInput) {
			for (let event in inputListeners) {
				newInput.addEventListener(event, inputListeners[event]);
			}
		}

		input.value = newInput;
	}

	onMounted(() => {
		updateInput();
		checkValue();
	});

</script>
