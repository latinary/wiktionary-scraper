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
import { insertWord } from "./database/word_adder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let scrapedWords = loadWords();
let curr: InsertWord[] = [];

let delay = 200;

async function generate() {
    console.time('Loading links');
    let words = loadLinks();
    console.timeEnd('Loading links');

    console.log(`Loaded ${scrapedWords.length} words from cache`);

    console.log('Scraping words...');

    // @ts-ignore
    const lastUrl: string = scrapedWords[scrapedWords.length - 1].url;
    let start = false;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (word == lastUrl) {
            start = true;
            console.log(`Starting with ${word}`);
        }
        if (!start) {
            continue;
        }

        try {
            const scraped = await scrapeWord(word);
            
            if (!scraped) {
                console.log(`Couldn't scrape: ${word}`);
                continue;
            }
    
            console.log(`Scraped: ${word}`);
    
            const converted = await convertWordData(scraped as ScrapedResult);
    
            console.log(`Converted:`);
            console.log(converted)

            if (converted.length > 0) {
                // @ts-ignore
                converted[converted.length - 1].url = word;
            }
    
            curr.push(...converted);
    
            saveWords([...scrapedWords, ...curr]);
    
            await sleep(delay);
        }
        catch (e) {
            // const newModel = getModel() == 'chatgpt' ? 'davinci' : 'chatgpt';
            console.log(e);
            console.log(`Rate limit`);
            // changeModel(newModel);
            console.log(`Current word count: ${[...scrapedWords, ...curr].length}`);
            console.log(`Current delay: ${delay}ms`);
            if (delay == 200) {
                delay = 500;
            }
            else if (delay == 500) {
                delay = 1000;
            }
            await sleep(60 * 1000);
            console.log('Recovering from rate limit');
        }
    }
}

async function addWords() {
    // insertWord(scrapedWords[0]);
    for (const word of scrapedWords) {
        await insertWord(word);
    }
}

async function main() {
    // await generate();
    await addWords();
}

main();