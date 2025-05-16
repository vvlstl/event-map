import {TValidatorMessages} from '~/js/controllers/form/type/TValidator';
import TFormErrorTriggerParams from '~/js/controllers/form/type/TFormErrorTriggerParams';

type TFormController = {
    validation: () => boolean,
    clearValidation: () => void,
    showErrors: (errors: {[fields: string]: string|TValidatorMessages}) => void,
    triggerErrors: (errors: {[fields: string]: TFormErrorTriggerParams}) => void,
    getData: () => any,
    getFormData: () => FormData,
}

export default TFormController;
