import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { InsertWord } from '../database/models/word';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function saveWords(words: InsertWord[]) {
    fs.writeFileSync(path.join(__dirname, '../../', 'words.json'), JSON.stringify({
        words
    }));
}

export function loadWords(): InsertWord[] {
    const data = fs.readFileSync(path.join(__dirname, '../../', 'words.json')).toString();
    const json = JSON.parse(data);

    return json.words;
}