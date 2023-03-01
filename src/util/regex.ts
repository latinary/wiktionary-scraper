export function removeParentheses(str: string): string {
    return str.replace(/\s*\([^()]*\)/gm, "");
}

export function extractConjugationOrDeclension(str: string): { number: any, type: string } | null {
    const match = str.match(/(\bfirst|\bsecond|\bthird|\bfourth|\bfifth)(?:\/(\bfirst|\bsecond|\bthird|\bfourth|\bfifth))?(?:\s*-)?\s*(conjugation|declension)/i);
    // Match the conjugation/declension number as a word (possibly followed by another number separated by a slash), optional whitespace and dash, and then the type
    if (match) {
        const numbersText = match[1].toLowerCase() + (match[2] ? '/' + match[2].toLowerCase() : ''); // Get the matched number(s) as a lowercase string
        const numbers = numbersText.split('/'); // Split the number(s) on "/"
        const type = match[3].toLowerCase(); // Convert the matched type to lowercase
        return { number: numbers, type };
    }
    return null; // If no match was found, return nullas found, return null
}

export function removeConjugationOrDeclension(str: string): string {
    return str.replace(/;?\s*(first|second|third|fourth|fifth)(?:\/(first|second|third|fourth|fifth))?(?:\s*-)?\s*(conjugation|declension)/i, '');
}