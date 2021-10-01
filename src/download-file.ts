import fs from 'fs';
import https from 'https';
import http from 'http';

const resolveContent = (options: { response: http.IncomingMessage; target: fs.WriteStream }): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        options.response
            .pipe(options.target)
            .on('close', () => {
                resolve(true);
            })
            .on('finish', () => {
                resolve(true);
            })
            .on('error', () => {
                resolve(false);
            });
    });
};

const downloadFile = (options: { url: string; targetPath: string }): Promise<boolean> => {
    const get = options.url.includes('https://') ? https.get : http.get;

    return new Promise<boolean>((resolve) => {
        get(options.url, (response) => {
            const target = fs.createWriteStream(options.targetPath);

            resolve(resolveContent({ response, target }));
        }).on('error', () => {
            resolve(false);
        });
    });
};

export { downloadFile };
