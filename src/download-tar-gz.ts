import path from 'path';
import fs from 'fs-extra';
import tar from 'tar';

import { downloadFile } from './download-file';

const downloadTarGz = async (name: string, url: string, outputPath: string): Promise<void> => {
    const tarGzFileName = `${name}.tar.gz`;
    const tarGzURL = `${url}${url.endsWith('/') ? '' : '/'}${tarGzFileName}`;
    const targetFile = path.resolve(outputPath, tarGzFileName);

    const saved = await downloadFile(tarGzURL, targetFile);
    if (!saved) {
        console.error('Failed to download remote DTS: ', tarGzURL);
    }

    await tar.x({
        file: targetFile,
        cwd: outputPath,
    });
    await fs.remove(targetFile);
};

export { downloadTarGz };
