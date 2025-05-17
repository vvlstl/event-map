import {TValidatorResult} from '~/js/controllers/form/type/TValidator';

export function minLength(val: any, params: any): TValidatorResult {
    const result = {valid: true, messages: {minLength: 'minLength'}};

    if (!params?.value) return result;

    if (!val) return result;

    result.valid = val.length >= params.value;

    return result;
}

export function maxLength(val: any, params: any): TValidatorResult {
    const result = {valid: true, messages: {maxLength: 'maxLength'}};

    if (!params?.value) return result;

    if (!val) return result;

    result.valid = val.length <= params.value;

    return result;
}


export function stringLength(val: any, params: any): TValidatorResult {
    if (!val || !val.length) return {valid: true, messages: {}};

    if (typeof val !== 'string') {
        return {valid: false, messages: {invalidType: 'invalidType'}};
    }

    const min = params?.min || undefined;
    const max = params?.max || undefined;

    if (min !== undefined && max !== undefined && max < min) {
        return {valid: true, messages: {}};
    }

    const messages = {};

    if (min !== undefined && val.length < min) {
        messages['minLength'] = 'minLength';
    }

    if (max !== undefined && val.length > max) {
        messages['maxLength'] = 'maxLength';
    }

    return {valid: Object.keys(messages).length === 0, messages: messages};
}

export function required(val: any): TValidatorResult {
    const result = {valid: false, messages: {required: 'required'}};

    if (typeof val === 'boolean' && !val) return result;

    if (typeof val === 'undefined' || val === null) return result;

    if (typeof val === 'string' && val.trim().length === 0) return result;

    if (Array.isArray(val) && val.length === 0) return result;

    result.valid = true;

    return result;
}

export function email(val: any): TValidatorResult {
    const result = {valid: true, messages: {email: 'email'}};

    if (!val) return result;

    if (typeof val !== 'string') {
        result.valid = false;

        return result;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    result.valid = re.test(val.toLowerCase());

    return result;
}

export function phone(val: any): TValidatorResult {
    const result = {valid: true, messages: {phone: 'phone'}};

    if (!val) return result;

    result.valid = (val || '').replaceAll(/\D/g, '').length === 11;

    return result;
}

export function emailOrPhone(val: any): TValidatorResult {
    const result = {valid: true, messages: {emailOrPhone: 'emailOrPhone'}};

    if (!val) return result;

    const isValidEmail = email(val);
    const isValidPhone = phone(val);

    result.valid = isValidEmail.valid || isValidPhone.valid;

    return result;
}

export function fileExtension(val: Array<File> | File, params: {ext: Array<string>}): TValidatorResult {
    const checkExt = params.ext.map(ext => ext.toLowerCase());
    const result = {valid: true, messages: {fileExtension: 'fileExtension'}};
    const arrVal = Array.isArray(val)? val : (val ? [val] : []);

    for (const file of arrVal) {
        const fileExt = file.name.split('.').pop()?.toLowerCase() || '';

        if (checkExt.indexOf(fileExt) < 0) {
            result.valid = false;
            break;
        }
    }

    return result;
}

export function fileSize(val: Array<File> | File, params: {value: number}): TValidatorResult {
    const result = {valid: true, messages: {fileSize: 'fileSize'}};
    const arrVal = Array.isArray(val)? val : (val ? [val] : []);

    for (const file of arrVal) {
        const size = file.size / 1024;

        if (size > params.value) {
            result.valid = false;
            break;
        }
    }

    return result;
}

export function fileTotalSize(val: Array<File> | File, params: {value: number}): TValidatorResult {
    const result = {valid: true, messages: {fileTotalSize: 'fileTotalSize'}};
    const arrVal = Array.isArray(val)? val : (val ? [val] : []);
    const totalSize = arrVal.reduce((previousValue, currentValue) => (previousValue + currentValue.size), 0) / 1024;

    if (totalSize > params.value) {
        result.valid = false;
    }

    return result;
}

