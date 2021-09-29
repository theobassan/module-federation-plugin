import { buildIndexContent } from './content-builder';

import { buildExposedModuleTypes } from './exposed-module-types-builder';
import { buildTarGzBufferFromFiles } from './tar-gz-builder';

const buildTarGzBuffer = (
    exposes: Record<string, string>,
    exposedModuleName: string,
    exposedModuleType?: 'react' | 'react-fc',
    propsRegex?: string,
): Buffer => {
    const exposedModulesTypeFiles: Array<Record<string, string>> = [];
    for (const [exposedFile, exposedPath] of Object.entries(exposes)) {
        if (exposedFile && exposedPath) {
            const exposedModuleTypeFiles = buildExposedModuleTypes(
                exposedModuleName,
                exposedFile,
                exposedPath,
                exposedModuleType,
                propsRegex,
            );
            exposedModulesTypeFiles.push(...exposedModuleTypeFiles);
        }
    }
    exposedModulesTypeFiles.push({
        name: 'index.d.ts',
        content: buildIndexContent(exposedModuleName),
    });

    return buildTarGzBufferFromFiles(exposedModulesTypeFiles);
};

export { buildTarGzBuffer };
