import { InsertWord } from "./models/word.js";
import { addWord, doesWordExist } from "./words.js";

export async function insertWord(word: InsertWord) {
    console.log(`adding word: ${word.rijec}`);

    const exists = await doesWordExist(word.rijec);

    if (exists) {
        console.log(`word ${word.rijec} exists`);
        return;
    }

    const r = await addWord(word);

    if (r) {
        console.log(`added word ${word.rijec}`);
    }
    else {
        console.log(`couldn't add word ${word.rijec}`);
    }
}