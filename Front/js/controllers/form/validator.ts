import TValidator, {TValidatorFunc, TValidatorMessages} from '~/js/controllers/form/type/TValidator';
import { reactive, ref, Ref } from 'vue';
import TField from '~/js/controllers/form/type/TField';
import * as defaultRules from '~/js/controllers/form/ruleDefaults';
import ruleDefaultMessage from '~/js/controllers/form/ruleDefaultMessage';

const disabledFields = ref({});

const validatorPool: {[name: string]: TValidatorFunc} = {
    ...defaultRules,
};

function getMessage(template: string, params?: any): string {
    if (ruleDefaultMessage.hasOwnProperty(template)) {
        template = ruleDefaultMessage[template];
    }

    if (typeof params !== 'object') return template;

    for (const paramsKey in params) {
        template = template.replaceAll(`%${paramsKey}%`, params[paramsKey]);
    }

    return template;
}

let messageGenerator: (template: string, params?: any) => string = getMessage;

export function registerValidator(name: string, callback: TValidatorFunc) {
    validatorPool[name] = callback;
}

export function getValidator(name: string): TValidatorFunc | null {
    return validatorPool[name] || null;
}

export function registerMessageGenerator(generator: (template: string, params?: any) => string) {
    messageGenerator = generator;
}

export default function validatorController(validatorRules: TField['validators'] = {}, value: Ref, fieldName: string): TValidator {
    const validators = reactive(validatorRules);

    const valid = ref(true);
    const message = ref('');
    const errors = reactive<TValidator['errors']>({});

    const isEnabled: TValidator['isEnabled'] = () => {
        const map = disabledFields.value;

        if (!map.hasOwnProperty(fieldName)) return true;

        return !map[fieldName];
    };

    const enable: TValidator['enable'] = (state: boolean) => {
        disabledFields.value[fieldName] = !state;
    };

    const setError: TValidator['setError'] = (errorMessage: string|TValidatorMessages) => {
        valid.value = false;

        if (typeof errorMessage === 'string') {
            errorMessage = {common: errorMessage};
        }

        message.value = Object.values(errorMessage).join(' ');

        for (let errorMessageCode in errorMessage) {
            errors[errorMessageCode] = errorMessage[errorMessageCode];
        }
    };

    const clear: TValidator['clear'] = () => {
        valid.value = true;
        message.value = '';

        for (const errorsKey in errors) {
            delete errors[errorsKey];
        }
    };

    const triggerError: TValidator['triggerError'] = (ruleCode: string, errorCodes?: TValidatorMessages) => {
        let ruleParams;
        let ruleMessages;

        if (validators[ruleCode] !== undefined) {
            ruleParams = validators[ruleCode].params;
            ruleMessages = validators[ruleCode]?.messages;
        } else {
            ruleParams = {};
            ruleMessages = {};
        }

        errorCodes = errorCodes || {[ruleCode]: ruleCode};

        valid.value = false;
        const errorMessage = {};

        for (let errorCode in errorCodes) {
            errorMessage[errorCode] = getMessageByCode(errorCodes[errorCode] || errorCode, ruleMessages, ruleParams);
        }

        setError(errorMessage);
    };

    const setValidator: TValidator['setValidator'] = (newRules) => {
        for (const newRulesKey in newRules) {
            validators[newRulesKey] = newRules[newRulesKey];
        }
    };

    const removeValidator: TValidator['removeValidator'] = (removedRules) => {
        if (typeof removedRules === 'string') {
            removedRules = [removedRules];
        }

        removedRules.forEach(name => {
            if (typeof validators[name] !== 'undefined') {
                delete validators[name];
            }
        });
    };

    const validate: TValidator['validate'] = () => {
        clear();

        for (const validatorsKey in validators) {
            if (!isEnabled()) continue;

            let rule;

            if (validators[validatorsKey].hasOwnProperty('rule'))  {
                rule = validators[validatorsKey].rule;
            } else {
                rule = validatorsKey;
            }

            const ruleParams = validators[validatorsKey].params;

            let validFunc: TValidatorFunc = () => {return {valid: true, messages: {}};};

            if (typeof rule === 'string') {
                if (typeof validatorPool[rule] === 'function') {
                    validFunc = validatorPool[rule];
                }
            } else {
                validFunc = rule;
            }

            const validationResult = validFunc(value.value, ruleParams);

            if (!validationResult || !validationResult.valid) {
                valid.value = false;

                const errorMessage = {};

                for (let errorCode in validationResult.messages) {
                    const resultMessage = validationResult.messages[errorCode] || errorCode;

                    errorMessage[errorCode] = getMessageByCode(resultMessage, validators[validatorsKey]?.messages, ruleParams);
                }
                setError(errorMessage);
            } else {
                errors[validatorsKey] = null;
            }
        }
    };

    const getMessageByCode = (messageCode: string, messages: {[name: string]: string}|undefined, params?: any): string => {
        let ruleMessage:string | null | undefined = typeof messages === 'object' ? messages[messageCode] : null;
        let errorMessage: string;

        if (ruleMessage) {
            errorMessage = getMessage(ruleMessage, params);
        } else {
            try {
                errorMessage = messageGenerator(messageCode, params);
            } catch (e) {
                errorMessage = messageCode;
            }
        }

        return errorMessage;
    };

    return {
        valid,
        message,
        errors,
        validate,
        setError,
        triggerError,
        enable,
        isEnabled,
        clear,
        setValidator,
        removeValidator,
    };
}
