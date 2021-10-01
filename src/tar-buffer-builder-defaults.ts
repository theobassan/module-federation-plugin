import { Uint8ContentFileProps, Uint8FileProps } from './tar-buffer-builder-types';

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

export { defaults };
