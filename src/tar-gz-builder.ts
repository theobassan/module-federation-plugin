import * as gzip from 'gzip-js';

import { buildTarBuffer, ContentFileProps } from './tar-buffer-builder';

const buildTarGzBufferFromFiles = (files: Array<Record<string, string>>): Buffer => {
    const assinedFiles = files.map((file: Record<string, string>) => {
        const assinedFile: ContentFileProps = Object.assign(file);
        return assinedFile;
    });
    const tarData = buildTarBuffer(assinedFiles);
    const opts = { level: 9, timestamp: Math.floor(new Date().getTime() / 1000) };
    const gzipped = gzip.zip(tarData, opts);
    const uInt = Uint8Array.from(gzipped);
    const buffer = Buffer.from(uInt);

    return buffer;
};

export { buildTarGzBufferFromFiles };
