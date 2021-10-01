export type HeaderProps = {
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
};

export type Uint8FileProps = {
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
};

export type ContentFileProps = {
    name: string;
    content: string;
};

export type Uint8ContentFileProps = {
    name: string;
    content: Uint8Array;
};
