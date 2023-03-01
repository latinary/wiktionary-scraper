export function removeParentheses(str: string): string {
    return str.replace(/\s*\([^()]*\)/gm, "");
}

export function extractConjugationOrDeclension(str: string): { number: any, type: string } | null {
    const match = str.match(/(\bfirst|\bsecond|\bthird|\bfourth|\bfifth)(?:\/(\bfirst|\bsecond|\bthird|\bfourth|\bfifth))?(?:\s*-)?\s*(conjugation|declension)/i);
    // Match the conjugation/declension number as a word (possibly followed by another number separated by a slash), optional whitespace and dash, and then the type

    if (match) {
        const numbersText = match[0];
        const numbers = numbersText
            .replace(/(conjugation|declension)/i, '')
            .replace('-', '')
            .replace(' ', '')
            .trim()
            .split('/');
        const type = numbersText
            .replace("-", " ")
            .split(" ")[1];
        return { number: numbers, type };
    }
    return null; // If no match was found, return null
}

export function removeConjugationOrDeclension(str: string): string {
    return str.replace(/;?\s*(first|second|third|fourth|fifth)(?:\/(first|second|third|fourth|fifth))?(?:\s*-)?\s*(conjugation|declension)/gmi, '');
}

export function extractGender(str: string): string {
    const match = str.match(/\s(m|f|n)\b\s*/gmi);
    if (match) {
        const gender = match[0].toLowerCase().trim();
        switch (gender) {
            case 'm':
                return 'masculinum';
            case 'f':
                return 'femininum';
            case 'n':
                return 'neutrum';
        }
    }
    return '-';
}

export function removeGender(str: string): string {
    return str.replace(/\s(m|f|n)\b\s*/gmi, '');
}

export function removeAll(str: string): string {
    return removeGender(removeConjugationOrDeclension(removeParentheses(str)));
}