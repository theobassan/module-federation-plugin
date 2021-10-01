import path from 'path';
import fs from 'fs-extra';
import tar from 'tar';

import { downloadFile } from './download-file';

const downloadTarGz = async (options: { name: string; url: string; outputPath: string }): Promise<void> => {
    const tarGzFileName = `${options.name}.tar.gz`;
    const tarGzURL = `${options.url}${options.url.endsWith('/') ? '' : '/'}${tarGzFileName}`;
    const targetFile = path.resolve(options.outputPath, tarGzFileName);

    console.log(`[ModuleFederationPluginRemote] Downloading module "${options.name}" type files`);

    const saved = await downloadFile({ url: tarGzURL, targetPath: targetFile });
    if (!saved) {
        const errorMessage = `[ModuleFederationPluginRemote] Failed to download module "${options.name}" type files`;
        console.log(errorMessage);
    } else {
        await tar.x({
            file: targetFile,
            cwd: options.outputPath,
        });
        await fs.remove(targetFile);
    }
};

export { downloadTarGz };
