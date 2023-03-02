export type ScrapedWord = {
    rijec: string;
    meanings: string[];
    declension?: any;
    conjugation?: any;
    type?: string;
    gender?: string;
};

export type ScrapedResult = {
    adjectives: Array<ScrapedWord>,
    adverbs: Array<ScrapedWord>,
    conjunctions: Array<ScrapedWord>,
    nouns: Array<ScrapedWord>,
    particles: Array<ScrapedWord>,
    prepositions: Array<ScrapedWord>,
    proper_nouns: Array<ScrapedWord>,
    verbs: Array<ScrapedWord>,
};

export type WordResults = ScrapedWord[];