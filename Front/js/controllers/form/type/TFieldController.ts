import TValidator, {TValidatorMessages} from '~/js/controllers/form/type/TValidator';
import TFormValueOption from '~/js/controllers/form/type/TFormValueOption';
import { Ref } from 'vue';

type TFieldController<T = any> = {
    value: T,
    validator: TValidator,

    name: Ref<string>,
    label: Ref<string>,
    attrs: {
        [name: string]: string|null
    }
    options?: {
        [name: string]: any
    }
    valueOptions?: Array<TFormValueOption>

    triggerError: (rule: string, error?: TValidatorMessages) => void,
    showError: (error: string) => void,
    enableValidation: (state: boolean) => void,
    isEnabledValidation: () => boolean,
}

export default TFieldController;
