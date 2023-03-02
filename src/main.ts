import { translateToCroatian } from "./ai/ai.js";
import { getLinks } from "./crawler/crawler.js";
import { ScrapedResult } from "./scraper/models/scraped_word.js";
import { scrapeWord } from "./scraper/scraper.js";
import { convertWordData } from "./scraper/word_data.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadLinks } from "./files/loader.js";
import { loadWords, saveWords } from "./files/words.js";
import { InsertWord } from "./database/models/word.js";
import { sleep } from "./util/util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let scrapedWords = loadWords();
let curr: InsertWord[] = [];

async function main() {
    console.time('Loading links');
    let words = loadLinks();
    console.timeEnd('Loading links');

    console.log(`Loaded ${scrapedWords.length} words from cache`);

    console.log('Scraping words...');

    for (let i = scrapedWords.length; i < words.length; i++) {
        const word = words[i];

        const scraped = await scrapeWord(word);
        
        if (!scraped) {
            console.log(`Couldn't scrape: ${word}`);
            continue;
        }

        console.log(`Scraped: ${word}`);

        const converted = await convertWordData(scraped as ScrapedResult);

        console.log(`Converted:`);
        console.log(converted);

        curr.push(...converted);

        saveWords([...scrapedWords, ...curr]);

        await sleep(1000);
    }
}

main();