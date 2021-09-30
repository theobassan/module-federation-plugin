import fs from 'fs-extra';

import { downloadTarGz } from './download-tar-gz';

const download = async (remotes: Record<string, string>): Promise<void> => {
    for (const [remoteModuleName, remoteModulePath] of Object.entries(remotes)) {
        console.log(`[ModuleFederationRemoteTypesPlugin] downloading module "${remoteModuleName}" type files`);

        const outputPath = `node_modules/${remoteModuleName}`;

        const splited = remoteModulePath.split('@')[1].split('/');
        splited.pop();
        const url = splited.join('/');

        await fs.ensureDir(outputPath);
        await downloadTarGz(remoteModuleName, url, outputPath);
    }
};

export { download };
