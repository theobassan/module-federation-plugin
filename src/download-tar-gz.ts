import path from 'path';
import fs from 'fs-extra';
import tar from 'tar';

import { downloadFile } from './download-file';

const downloadTarGz = async (name: string, url: string, outputPath: string): Promise<void> => {
    const tarGzFileName = `${name}.tar.gz`;
    const tarGzURL = `${url}${url.endsWith('/') ? '' : '/'}${tarGzFileName}`;
    const targetFile = path.resolve(outputPath, tarGzFileName);

    console.log(`[ModuleFederationPluginRemote] Downloading module "${name}" type files`);

    const errorMessage = `[ModuleFederationPluginRemote] Failed to download module "${name}" type files`;
    try {
        const saved = await downloadFile(tarGzURL, targetFile);
        if (!saved) {
            console.error(errorMessage);
        }
    } catch {
        console.error(errorMessage);
    }

    await tar.x({
        file: targetFile,
        cwd: outputPath,
    });
    await fs.remove(targetFile);
};

export { downloadTarGz };
