import { ScrapedWord, WordResults } from "./models/scraped_word";
import * as regex from '../util/regex.js';

const numberMap = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eight: 8,
    ninth: 9,
    tenth: 10,
}

async function getData(data: any, type: string): Promise<ScrapedWord> {
    const rijec = regex.removeAll(data.head);
    const dc = regex.extractConjugationOrDeclension(data.head);

    let nums = [];

    if (dc) {
        for (const number of dc.number) {
            // @ts-ignore
            nums.push(numberMap[number]);
        }
    }

    let declension = dc?.type == 'declension' ? nums : null;
    let conjugation = dc?.type == 'conjugation' ? nums : null;

    const gender = regex.extractGender(data.head);

    let meanings = [];

    for (const meaning of data.meanings) {
        // translate each meaning from English to Croatian
        // const data = await translateToCroatian(meaning);
        // console.log(meaning);
    }

    // @ts-ignore
    return {
        rijec,
        // @ts-ignore
        declension,
        // @ts-ignore
        conjugation,
        type,
        gender
    }
}

export async function getWord(url: string): Promise<WordResults> {
    // const wordData = await parseWiki(url, 'Latin');

    const results: WordResults = [];

    // console.log(wordData);
    
    // if (meanings?.adjective) {
    //     results.push(await getData(meanings.adjective, 'pridjev'));
    // }
    // if (meanings?.adverb) {
    //     results.push(await getData(meanings.adverb, 'prilog'));
    // }
    // if (meanings?.conjunction) {
    //     results.push(await getData(meanings.conjunction, 'veznik'));
    // }
    // if (meanings?.noun) {
    //     results.push(await getData(meanings.noun, 'imenica'));
    // }
    // if (meanings?.particle) {
    //     results.push(await getData(meanings.particle, 'čestica'));
    // }
    // if (meanings?.preposition) {
    //     results.push(await getData(meanings.preposition, 'prijedlog'));
    // }
    // if (meanings?.proper_noun) {
    //     results.push(await getData(meanings.proper_noun, 'vlastita imenica'));
    // }
    // if (meanings?.verb) {
    //     results.push(await getData(meanings.verb, 'glagol'));
    // }

    return results;
}