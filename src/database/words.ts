import { executeQuery } from "./connection";
import { InsertWord, Word } from "./models/word";

export async function addWord(word: InsertWord): Promise<boolean> {
    try {
        const query = `
            INSERT INTO rijeci (
                rijec, definicija, dodan, dodao, updated, tip, rod, deklinacija, konjugacija, deleted
            )
            VALUES(?, ?, ?, NOW(), ?, NOW(), ?, ?, ?, 1)`;
        const params = [word.rijec, word.definicija, -1, word.tip, word.rod, word.deklinacija, word.konjugacija];
        await executeQuery<any>(query, params);

        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}