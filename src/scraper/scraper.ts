import WiktionaryScraper, { parseWiki } from "js-wiktionary-scraper";
import fetch from 'node-fetch';

export async function getWord(url: string) {
    const wordData = await parseWiki(url, 'Latin');
    console.log(wordData);
    console.log(wordData.meanings?.verb?.meanings);
}