import { normalize } from "../util/util.js";
import { executeQuery } from "./connection.js";
import { InsertWord, Word } from "./models/word.js";

export async function addWord(word: InsertWord): Promise<boolean> {
    try {
        const query = `
            INSERT INTO rijeci (
                rijec, definicija, dodan, dodao, updated, tip, rod, deklinacija, konjugacija, deleted
            )
            VALUES(?, ?, NOW(), ?, NOW(), ?, ?, ?, ?, 1)`;
        const params = [normalize(word.rijec), word.definicija, -1, word.tip, word.rod, word.deklinacija, word.konjugacija];
        await executeQuery<any>(query, params);

        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

// ā ē

export async function doesWordExist(rijec: string): Promise<boolean> {
    try {
        const query = `SELECT * FROM rijeci WHERE rijec LIKE ? AND dodao != ?`;
        const params = [normalize(rijec), -1];

        const r = await executeQuery<any>(query, params);

        return r.length > 0;
    }
    catch (e) {
        console.log(e);
        return true;
    }
}

export async function getLastWord(): Promise<Word | null> {
    try {
        const query = 'SELECT * FROM rijeci WHERE dodao = -1 ORDER BY id DESC LIMIT 1';
        
        const r = await executeQuery<Word>(query, []);

        if (r.length > 0) {
            return r[0];
        }

        return null;

    }
    catch (e) {
        console.log(e);
        return null;
    }
}