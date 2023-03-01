export type ScrapedWord = {
    rijec: string;
    meanings: string[];
    declension?: string;
    conjugation?: string;
    type?: string;
    gender?: string;
};

export type WordResults = ScrapedWord[];