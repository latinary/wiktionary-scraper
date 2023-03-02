export type Word = {
    id: number,
    rijec: string,
    definicija: string,
    dodan: any,
    dodao: number,
    updated: any,
    tip: string,
    rod: string,
    deklinacija: string,
    konjugacija: string,
    deleted: boolean,
};

export type InsertWord = Omit<Word, 'id' | 'dodan' | 'dodao' | 'updated' | 'deleted'>;