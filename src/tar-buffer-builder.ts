interface HeaderProps {
    name: number;
    mode: number;
    uid: number;
    gid: number;
    size: number;
    mtime: number;
    chksum: number;
    typeflag: number;
    linkname: number;
    magic: number;
    version: number;
    uname: number;
    gname: number;
    devmajor: number;
    devminor: number;
    prefix: number;
    padding: number;
}

interface Uint8FileProps {
    name: string;
    mode: string;
    uid: number;
    gid: number;
    size: number;
    mtime: number;
    chksum: string;
    typeflag: string;
    magic: string;
    version: string;
    uname: string;
    gname: string;
}

export interface ContentFileProps {
    name: string;
    content: string;
}

interface Uint8ContentFileProps {
    name: string;
    content: Uint8Array;
}

const headers: HeaderProps = {
    name: 100,
    mode: 8,
    uid: 8,
    gid: 8,
    size: 12,
    mtime: 12,
    chksum: 8,
    typeflag: 1,
    linkname: 100,
    magic: 5,
    version: 2,
    uname: 32,
    gname: 32,
    devmajor: 8,
    devminor: 8,
    prefix: 155,
    padding: 12,
};

const offsets: HeaderProps = {
    name: 0,
    mode: 0,
    uid: 0,
    gid: 0,
    size: 0,
    mtime: 0,
    chksum: 0,
    typeflag: 0,
    linkname: 0,
    magic: 0,
    version: 0,
    uname: 0,
    gname: 0,
    devmajor: 0,
    devminor: 0,
    prefix: 0,
    padding: 0,
};
Object.keys(headers).reduce((acc: number, k: string) => {
    const key = k as keyof HeaderProps;
    offsets[key] = acc;
    return acc + headers[key];
}, 0);

const defaults = (f: Uint8ContentFileProps): Uint8FileProps => ({
    name: f.name,
    mode: '777',
    uid: 0,
    gid: 0,
    size: f.content.byteLength,
    mtime: Math.floor(Number(new Date()) / 1000),
    chksum: '        ',
    typeflag: '0',
    magic: 'ustar',
    version: '  ',
    uname: '',
    gname: '',
});

const shouldNotPad = ['name', 'linkname', 'magic', 'chksum', 'typeflag', 'version', 'uname', 'gname'];
const bsize = 512;

const pad = (s: number | string, n: number): string => {
    const stringS = s.toString(8);
    return ('000000000000' + stringS).slice(stringS.length + 12 - n);
};

const convertStringToUint8Array = (s: string): Uint8Array => {
    const a = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
    return a;
};

const buildBuffer = (fileContent: ContentFileProps): Uint8Array => {
    const fileContnetUint8: Uint8ContentFileProps = {
        name: fileContent.name,
        content: convertStringToUint8Array(fileContent.content),
    };

    const file: Uint8FileProps = Object.assign(defaults(fileContnetUint8), fileContnetUint8);
    const fileBuffer = new Uint8Array(Math.ceil((bsize + file.size) / bsize) * bsize);

    const checksum = Object.keys(headers).reduce((acc: number, k: string) => {
        if (!(k in file)) return acc;
        const fileKey = k as keyof Uint8FileProps;
        const headerKey = k as keyof HeaderProps;

        const value = convertStringToUint8Array(
            shouldNotPad.indexOf(k) > -1 ? file[fileKey].toString() : pad(file[fileKey], headers[headerKey] - 1),
        );

        fileBuffer.set(value, offsets[headerKey]);
        return acc + value.reduce((a, b) => a + b, 0);
    }, 0);

    fileBuffer.set(convertStringToUint8Array(pad(checksum, 7)), offsets.chksum);
    fileBuffer.set(fileContnetUint8.content, bsize);

    return fileBuffer;
};

const buildTarBuffer = (files: Array<ContentFileProps>): Uint8Array => {
    return files.reduce((bufferArray, fileContent) => {
        const fileBuffer = buildBuffer(fileContent);

        const newBufferArray = new Uint8Array(bufferArray.byteLength + fileBuffer.byteLength);
        newBufferArray.set(bufferArray, 0);
        newBufferArray.set(fileBuffer, bufferArray.byteLength);

        return newBufferArray;
    }, new Uint8Array(0));
};

export { buildTarBuffer };
