import { defaults } from './tar-buffer-builder-defaults';
import { headers, offsets } from './tar-buffer-builder-header';
import { HeaderProps, Uint8ContentFileProps, Uint8FileProps, ContentFileProps } from './tar-buffer-builder-types';

const shouldNotPad = ['name', 'linkname', 'magic', 'chksum', 'typeflag', 'version', 'uname', 'gname'];
const bsize = 512;

const padString = (options: { str: number | string; padSize: number }): string => {
    const stringS = options.str.toString(8);
    return ('000000000000' + stringS).slice(stringS.length + 12 - options.padSize);
};

const convertStringToUint8Array = (str: string): Uint8Array => {
    const a = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);
    return a;
};

const buildTarFileBuffer = (fileContent: ContentFileProps): Uint8Array => {
    const fileContnetUint8: Uint8ContentFileProps = {
        name: fileContent.name,
        content: convertStringToUint8Array(fileContent.content),
    };

    const file: Uint8FileProps = defaults(fileContnetUint8);
    const fileBuffer = new Uint8Array(Math.ceil((bsize + file.size) / bsize) * bsize);

    const checksum = Object.keys(headers).reduce((acc: number, k: string) => {
        if (!(k in file)) return acc;
        const fileKey = k as keyof Uint8FileProps;
        const headerKey = k as keyof HeaderProps;

        const value = convertStringToUint8Array(
            shouldNotPad.indexOf(k) > -1
                ? file[fileKey].toString()
                : padString({ str: file[fileKey], padSize: headers[headerKey] - 1 }),
        );

        fileBuffer.set(value, offsets[headerKey]);
        return acc + value.reduce((a, b) => a + b, 0);
    }, 0);

    fileBuffer.set(convertStringToUint8Array(padString({ str: checksum, padSize: 7 })), offsets.chksum);
    fileBuffer.set(fileContnetUint8.content, bsize);

    return fileBuffer;
};

export { buildTarFileBuffer };
