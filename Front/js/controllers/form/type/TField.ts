import { TValidatorRule } from '~/js/controllers/form/type/TValidator';
import TFormValueOption from '~/js/controllers/form/type/TFormValueOption';

type TField = {
    value: any,
    name: string,
    label: string,
    attrs: {
        [name: string]: string | number | boolean,
    }
    options?: {
        [name: string]: any
    }
    valueOptions?: Array<TFormValueOption>

    realtimeValidate?: boolean,
    validators?: {
        [name: string]: TValidatorRule
    }
}

export default TField;

