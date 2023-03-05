export function sleep(ms: number): any {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
}

export function normalize(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}