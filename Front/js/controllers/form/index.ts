import { reactive } from 'vue';

import TFormParams from '~/js/controllers/form/type/TFormParams';
import TFormController from '~/js/controllers/form/type/TFormController';
import TField from '~/js/controllers/form/type/TField';
import TFieldController from '~/js/controllers/form/type/TFieldController';
import {TValidatorMessages} from '~/js/controllers/form/type/TValidator';

import fieldController from '~/js/controllers/form/field';
import TFormErrorTriggerParams from "~/js/controllers/form/type/TFormErrorTriggerParams";

export default function formController<T>(fields: { [name: string]: TField }, params: TFormParams = {}) {

    const controller = reactive<TFormController>({
        validation: () => true,
        clearValidation: () => {},
        showErrors: () => {},
        triggerErrors: () => {},
        getData: () => {},
        getFormData: () => new FormData(),
    });

    for (const fieldsKey in fields) {
        if (!fields[fieldsKey].hasOwnProperty('realtimeValidate')) {
            fields[fieldsKey].realtimeValidate = params?.realtimeValidate === undefined ? false : params.realtimeValidate;
        }

        controller[fieldsKey] = fieldController(fields[fieldsKey], fieldsKey);
    }

    controller.validation = () => {
        let summaryValid = true;

        for (const fieldsKey in fields) {
            const fieldUnit = controller[fieldsKey];

            fieldUnit.validator.validate();

            summaryValid = summaryValid && fieldUnit.validator.valid;
        }

        return summaryValid;
    };

    controller.clearValidation = () => {
        for (const fieldsKey in fields) {
            const fieldUnit = controller[fieldsKey];

            fieldUnit.validator.clear();
        }
    };

    controller.showErrors = (errors: {[fields: string]: string|TValidatorMessages}) => {
        for (const fieldsKey in fields) {
            if (!errors.hasOwnProperty(fieldsKey)) continue;

            const fieldUnit = controller[fieldsKey];

            fieldUnit.validator.setError(errors[fieldsKey]);
        }
    };

    controller.triggerErrors = (errors: {[fields: string]: TFormErrorTriggerParams}) => {
        for (const fieldsKey in fields) {
            if (!errors.hasOwnProperty(fieldsKey)) continue;

            const fieldUnit = controller[fieldsKey];
            const triggerParams = errors[fieldsKey];

            fieldUnit.validator.triggerError(triggerParams.rule, triggerParams.error);
        }
    };

    controller.getData = () => {
        const data = {};

        for (const fieldsKey in fields) {
            const fieldUnit = controller[fieldsKey];
            let exportValue;

            if (typeof fieldUnit.value === 'object') {
                exportValue = {...fieldUnit.value};
            } else {
                exportValue = fieldUnit.value;
            }

            data[fieldsKey] = exportValue;
        }

        return data;
    };

    controller.getFormData = () => {
        const formData =  new FormData();

        for (const fieldsKey in fields) {
            const fieldUnit = controller[fieldsKey];
            let exportValue;

            if (typeof fieldUnit.value === 'object') {
                exportValue = {...fieldUnit.value};
            } else {
                exportValue = fieldUnit.value;
            }

            if (typeof exportValue === 'object') {
                for (const exportValueKey in exportValue) {
                    const exportValueObject = typeof exportValue[exportValueKey] === 'boolean' ? Number(exportValue[exportValueKey]) : exportValue[exportValueKey];

                    formData.append(`${fieldsKey}[${exportValueKey}]`, exportValueObject);
                }
            } else {
                const exportValueObject = typeof exportValue === 'boolean' ? Number(exportValue) : exportValue;

                formData.append(fieldsKey, exportValueObject);
            }
        }

        return formData;
    };


    return controller as TFormController & {[name: string]: TFieldController} & T;
}

