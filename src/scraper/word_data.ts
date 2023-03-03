import { chatgptTranslate, translateToCroatian } from "../ai/ai.js";
import { InsertWord, Word } from "../database/models/word.js";
import { ScrapedResult, ScrapedWord } from "./models/scraped_word.js";

const typeMap = {
    'verb': 'glagol',
    'noun': 'imenica',
    'adjective': 'pridjev',
    'adverb': 'prilog',
    'conjunction': 'veznik',
    'particle': 'čestica',
    'preposition': 'prijedlog',
    'proper noun': 'vlastita imenica'
};

type modelType = 'chatgpt' | 'davinci';

let model: modelType = 'chatgpt';

export function changeModel(newModel: modelType) {
    model = newModel;
}

export function getModel(): modelType {
    return model;
}

export async function convertWordData(data: ScrapedResult): Promise<InsertWord[]> {
    const keys = [
        'adjectives',
        'adverbs',
        'conjunctions',
        'nouns',
        'particles',
        'prepositions',
        'proper_nouns',
        'verbs',
    ];

    let response: InsertWord[] = [];

    for (const key of keys) {
        // @ts-ignore
        for (const _item of data[key]) {
            const item: ScrapedWord = _item as ScrapedWord;

            if (item.meanings.length === 0) continue;

            let dictForm = "";

            for (let i = 0; i < item.meanings.length; i++) {
                if (item.meanings.length === 1) {
                    dictForm = item.meanings[0];
                    break;
                }
                
                dictForm += `${i + 1}) ${item.meanings[i]}; `;
            }

            dictForm = dictForm.trim();

            const translated = model == 'davinci' ? await translateToCroatian(dictForm) : await chatgptTranslate(dictForm);

            let deklinacija = '';
            let konjugacija = '';

            if (!item.declension) deklinacija = '-';

            else {
                deklinacija = item.declension.join(' ili ');
            }

            if (!item.conjugation) konjugacija = '-';

            else {
                konjugacija = item.conjugation.join(' ili ');
            }

            let tip = "-";

            if (item.type && item.type in typeMap) {
                // @ts-ignore
                tip = typeMap[item.type];
            }

            const resp: InsertWord = {
                rijec: item.rijec,
                definicija: translated.trim(),
                tip,
                rod: item.gender || '-',
                deklinacija,
                konjugacija
            };

            response.push(resp);
        }
    }
    
    return response;
}