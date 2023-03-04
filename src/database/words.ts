import { executeQuery } from "./connection.js";
import { InsertWord, Word } from "./models/word.js";

export async function addWord(word: InsertWord): Promise<boolean> {
    try {
        const query = `
            INSERT INTO rijeci (
                rijec, definicija, dodan, dodao, updated, tip, rod, deklinacija, konjugacija, deleted
            )
            VALUES(?, ?, NOW(), ?, NOW(), ?, ?, ?, ?, 1)`;
        const params = [word.rijec.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), word.definicija, -1, word.tip, word.rod, word.deklinacija, word.konjugacija];
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
        const params = [rijec.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), -1];

        const r = await executeQuery<any>(query, params);

        return r.length > 0;
    }
    catch (e) {
        console.log(e);
        return true;
    }
}