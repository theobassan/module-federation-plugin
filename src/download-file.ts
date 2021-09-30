import fs from 'fs';
import https from 'https';
import http from 'http';

const downloadFile = (url: string, targetPath: string): Promise<boolean> => {
    const get = url.includes('https://') ? https.get : http.get;

    return new Promise<boolean>((resolve) => {
        get(url, (response) => {
            const target = fs.createWriteStream(targetPath);
            response
                .pipe(target)
                .on('close', () => {
                    resolve(true);
                })
                .on('finish', () => {
                    resolve(true);
                })
                .on('error', () => {
                    resolve(false);
                });
        }).on('error', () => {
            resolve(false);
        });
    });
};

export { downloadFile };
