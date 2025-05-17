import TField from '~/js/controllers/form/type/TField';
import { reactive, ref, watch } from 'vue';
import validatorController from '~/js/controllers/form/validator';

import TFieldController from '~/js/controllers/form/type/TFieldController';
import {TValidatorMessages} from '~/js/controllers/form/type/TValidator';

export default function fieldController(field: TField, fieldName: string): TFieldController {
    const value = ref(field.value);
    const name = ref(field.name);
    const label = ref(field.label);
    const attrs = reactive(field.attrs);
    const valueOptions = reactive(field.valueOptions || []);
    const options = reactive(field.options || {});
    const validators = reactive(field?.validators || {});

    const validator = validatorController(validators, value, fieldName);

    watch(value, () => {
        validator.clear();

        if (field.realtimeValidate) {
            validator.validate();
        }
    });

    const triggerError = (rule: string, error?: TValidatorMessages) => {
        validator.triggerError(rule, error);
    };

    const showError = (error: string) => {
        validator.setError(error);
    };

    const enableValidation = (state: boolean) => {
        validator.enable(state);
    };

    const isEnabledValidation = () => {
        return validator.isEnabled();
    };

    return {
        value,
        validator,
        name,
        label,
        attrs,
        options,
        valueOptions,
        showError,
        triggerError,
        enableValidation,
        isEnabledValidation,
    };
}
