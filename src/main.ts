import { translateToCroatian } from "./ai/ai.js";
import { getLinks } from "./crawler/crawler.js";
import { ScrapedResult } from "./scraper/models/scraped_word.js";
import { scrapeWord } from "./scraper/scraper.js";
import { convertWordData } from "./scraper/word_data.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadWordList } from "./files/loader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function main() {
    console.time('Loading words');
    let words = loadWordList();
    console.timeEnd('Loading words');
    console.log(words.length);
}

main();