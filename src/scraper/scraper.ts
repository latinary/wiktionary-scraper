import { ScrapedResult, ScrapedWord, WordResults } from "./models/scraped_word.js";
import * as regex from '../util/regex.js';
import cheerio from 'cheerio';
import parser from 'node-html-parser'
import { translateToCroatian } from "../ai/ai.js";
import { urlToWord } from "../util/regex.js";

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

const titleMap = {
    'verb': 'verbs',
    'noun': 'nouns',
    'adjective': 'adjectives',
    'adverb': 'adverbs',
    'conjunction': 'conjunctions',
    'particle': 'particles',
    'preposition': 'prepositions',
    'proper noun': 'proper_nouns'
};

export async function scrapeWord(url: string): Promise<ScrapedResult | null> {
    const word = urlToWord(url);

    const data = await fetch(`https://en.wiktionary.org/api/rest_v1/page/html/${encodeURIComponent(word)}`);

    if (!data.ok) {
        return null;
    }

    const text = await data.text();

    const document = parser.parse(text);
    const section = document.querySelector('#Latin')?.parentNode;

    if (!section) {
        return null;
    }

    const response = {
        adjectives: [],
        adverbs: [],
        conjunctions: [],
        nouns: [],
        particles: [],
        prepositions: [],
        proper_nouns: [],
        verbs: [],
    };

    const titles = ['verb', 'noun', 'adjective', 'adverb', 'conjunction', 'particle', 'preposition', 'proper noun'];

    const sections = section.querySelectorAll('section');

    for (const section of sections) {
        let h3 = section.querySelector('h3');
        let h4 = section.querySelector('h4');

        if (!h3 && h4) {
            h3 = h4;
        }
        
        if (!h3) {
            console.log('no h3?')
            continue;
        }

        // @ts-ignore
        if (!titles.includes(h3.textContent.toLowerCase())) {
            console.log('no title')
            continue;
        }

        const titleParent = h3.parentNode;

        const wordEl = titleParent.querySelector('p');

        if (!wordEl) {
            console.log('no word')
            continue;
        }

        const word = wordEl.querySelector('.headword')?.textContent;

        if (!word) {
            console.log('no word')
            continue;
        }

        const gender = regex.extractGender(wordEl.textContent);

        const dc = regex.extractConjugationOrDeclension(wordEl.textContent);

        let nums = [];

        if (dc) {
            for (const number of dc.number) {
                // @ts-ignore
                nums.push(numberMap[number]);
            }
        }

        let declension = dc?.type == 'declension' ? nums : null;
        let conjugation = dc?.type == 'conjugation' ? nums : null;

        const meanings: string[] = [];
        
        const ol = titleParent.querySelector('ol')?.querySelectorAll('li');

        if (ol) {
            const allowedTags = ['a', 'span'];
          
            for (const child of ol) {
                // @ts-ignore
                const filteredChildNodes = Array.from(child.childNodes).filter(node => !node.tagName || allowedTags.includes(node.tagName?.toLowerCase()));
                let text = "";

                for (const node of filteredChildNodes) {
                    text += node.textContent;
                }

                if (text) {
                    meanings.push(text.trim());
                }
            }
        }

        const w: ScrapedWord = {
            rijec: word,
            meanings,
            declension,
            conjugation,
            // @ts-ignore
            type: h3.textContent.toLowerCase(),
            gender
        };

        // @ts-ignore
        response[titleMap[h3.textContent.toLowerCase()]].push(w);
    }

    return response;
}