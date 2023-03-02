import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadLinks(): string[] {
    const data = fs.readFileSync(path.join(__dirname, '../../', 'links.json')).toString();
    const json = JSON.parse(data);

    return json.links;
}