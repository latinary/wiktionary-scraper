import puppeteer from "puppeteer";
import { sleep } from "../util/util.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

let savedLinks: any[] = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function saveLinks(_l: any[]) {
    fs.writeFileSync(path.join(__dirname, '../../', 'links.json'), JSON.stringify({
        links: _l
    }));
}

export async function getLinks() {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto('https://en.wiktionary.org/wiki/Category:Latin_lemmas');
    
    while (true) {
        await sleep(500);
        let linkWrapper = await page.waitForSelector('#mw-pages .mw-content-ltr');

        if (!linkWrapper) {
            console.log('no link');
            await browser.close();
            return;
        }

        const links = await linkWrapper.$$eval('li > span > a', links => links.map(link => link.href));
    
        if (!links) {
            console.log('no links');
            await browser.close();
            return;
        }

        let nextPageBtn = await linkWrapper.$("xpath//html/body/div[3]/div[3]/div[5]/div[2]/div[2]/a[2]");
        let nextPageBtn1 = await linkWrapper.$("xpath//html/body/div[3]/div[3]/div[5]/div[2]/div[2]/a[1]");

        if (!nextPageBtn && nextPageBtn1) {
            nextPageBtn = nextPageBtn1;
        }

        if (!nextPageBtn) {
            console.log('no next btn');
            break;
        }

        for (const link of links) {
            savedLinks.push(link);
        }

        saveLinks(savedLinks);

        // @ts-ignore
        const url = await nextPageBtn.evaluate(el => el.href);
        await page.goto(url);
    }

    saveLinks(savedLinks);

    await browser.close();
}