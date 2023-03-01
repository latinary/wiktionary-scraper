import { parseWiki, WiktionaryMeaningData } from "js-wiktionary-scraper";
import { ScrapedWord, WordResults } from "./models/scraped_word.js";
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

function getData(data: WiktionaryMeaningData, type: string): ScrapedWord {
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
    }

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
    const wordData = await parseWiki(url, 'Latin');

    if (wordData.error) {
        throw 'Word not found';
    }

    const results: WordResults = [];

    const meanings = wordData.meanings;
    
    if (meanings?.adjective) {
        results.push(getData(meanings.adjective, 'pridjev'));
    }
    if (meanings?.adverb) {
        results.push(getData(meanings.adverb, 'prilog'));
    }
    if (meanings?.conjunction) {
        results.push(getData(meanings.conjunction, 'veznik'));
    }
    if (meanings?.noun) {
        results.push(getData(meanings.noun, 'imenica'));
    }
    if (meanings?.particle) {
        results.push(getData(meanings.particle, 'čestica'));
    }
    if (meanings?.preposition) {
        results.push(getData(meanings.preposition, 'prijedlog'));
    }
    if (meanings?.proper_noun) {
        results.push(getData(meanings.proper_noun, 'vlastita imenica'));
    }
    if (meanings?.verb) {
        results.push(getData(meanings.verb, 'glagol'));
    }

    return results;
}