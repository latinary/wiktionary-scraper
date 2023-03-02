import { translateToCroatian } from "./ai/ai.js";
import { scrapeWord } from "./scraper/scraper.js";

// getWord("https://en.wiktionary.org/wiki/videre#Latin");

scrapeWord("https://en.wiktionary.org/wiki/video#Latin").then(console.log);
scrapeWord("https://en.wiktionary.org/wiki/abduco#Latin").then(console.log);
scrapeWord("https://en.wiktionary.org/wiki/abiecte#Latin").then(console.log);

// translateToCroatian('1) an artificial intelligence').then((data) => {
//     console.log(data);
// });