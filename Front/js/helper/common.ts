export function clearPhone(phone: string): string {
    let cleaned = (phone).replace(/\D/g, '');
    let len = cleaned.length;

    if (len == 10) return '+7' + cleaned;

    if (len == 11) return cleaned.replace(/^[78]/, '+7');

    return cleaned;
}

export function wordForm(num: number, word: string[]): string {
    let cases = [2, 0, 1, 1, 1, 2];

    return word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}
