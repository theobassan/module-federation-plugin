import { ContentFileProps } from './tar-buffer-builder-types';
import { buildTarFileBuffer } from './tar-file-buffer-builder';

const buildTarFilesBuffer = (files: Array<ContentFileProps>): Uint8Array => {
    return files.reduce((bufferArray, fileContent) => {
        const fileBuffer = buildTarFileBuffer(fileContent);

        const newBufferArray = new Uint8Array(bufferArray.byteLength + fileBuffer.byteLength);
        newBufferArray.set(bufferArray, 0);
        newBufferArray.set(fileBuffer, bufferArray.byteLength);

        return newBufferArray;
    }, new Uint8Array(0));
};

export { buildTarFilesBuffer };
