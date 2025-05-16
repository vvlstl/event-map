import { Ref } from 'vue';


export type TValidatorMessages = {[name: string]: string};

export type TValidatorResult = {
    valid: boolean,
    messages: TValidatorMessages,
}

export type TValidatorFunc = (value: any, params?: any) => TValidatorResult;

export type TValidatorRule = {
    rule?: TValidatorFunc | string,
    params?: any,
    messages?: {[name: string]: string},
};

type TValidator = {
    readonly valid: Ref<boolean> | {readonly value: boolean},
    readonly message: Ref<string> | {readonly value: string},
    errors: {[name: string]: string | null},
    validate: () => void,

    triggerError: (ruleCode: string, errorCode?: TValidatorMessages) => void,
    setError: (errorMessage: string|TValidatorMessages) => void,
    enable: (state: boolean) => void,
    isEnabled: () => boolean,
    clear: () => void,

    setValidator: (validators: { [name: string]: TValidatorRule }) => void,
    removeValidator: (validators: string | Array<string>) => void,
}


export default TValidator;
