import { describe, expect, it } from '@jest/globals';
import { scrapeWord } from '../src/scraper/scraper';

describe('scraper', () => {
    it('scrapes', async () => {
        const w = await scrapeWord("https://en.wiktionary.org/wiki/abiecte#Latin");
        expect(w?.adverbs[0].rijec).toEqual('abiectē');
    });
});