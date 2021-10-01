import { HeaderProps } from './tar-buffer-builder-types';

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
Object.keys(headers).reduce((accumulated: number, k: string) => {
    const key = k as keyof HeaderProps;
    offsets[key] = accumulated;
    return accumulated + headers[key];
}, 0);

export { headers, offsets };
