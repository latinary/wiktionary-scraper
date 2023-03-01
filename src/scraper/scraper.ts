import { parseWiki, WiktionaryMeaningData } from "js-wiktionary-scraper";
import { ScrapedWord, WordResults } from "./models/scraped_word";

function getData(data: WiktionaryMeaningData, type: string): ScrapedWord {
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