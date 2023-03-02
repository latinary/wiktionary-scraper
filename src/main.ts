import { translateToCroatian } from "./ai/ai.js";
import { ScrapedResult } from "./scraper/models/scraped_word.js";
import { scrapeWord } from "./scraper/scraper.js";
import { convertWordData } from "./scraper/word_data.js";

async function main() {
    // const scraped = await scrapeWord("https://en.wiktionary.org/api/rest_v1/page/html/video");

    // if (!scraped) {
    //     console.log('Sto mu gromova!')
    // }

    // const data = await convertWordData(scraped as ScrapedResult);

    // console.log(data);
}

main();