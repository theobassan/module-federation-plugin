import { buildIndexContent } from './content-builder';

import { buildExposedModuleTypes } from './exposed-module-types-builder';
import { buildTarGzBufferFromFiles } from './tar-gz-builder';

const buildTarGzBuffer = (options: {
    exposes: Record<string, string>;
    exposedModuleName: string;
    exposedModuleType?: 'react' | 'react-fc';
    exposedPropsRegex?: string;
}): Buffer => {
    const exposedModulesTypeFiles: Array<Record<string, string>> = [];

    for (const [exposedFile, exposedPath] of Object.entries(options.exposes)) {
        if (exposedFile && exposedPath) {
            const exposedModuleTypeFiles = buildExposedModuleTypes({
                exposedModuleName: options.exposedModuleName,
                exposedFile,
                exposedPath,
                exposedModuleType: options.exposedModuleType,
                exposedPropsRegex: options.exposedPropsRegex,
            });
            exposedModulesTypeFiles.push(...exposedModuleTypeFiles);
        }
    }
    exposedModulesTypeFiles.push({
        name: 'index.d.ts',
        content: buildIndexContent(options.exposedModuleName),
    });

    return buildTarGzBufferFromFiles(exposedModulesTypeFiles);
};

export { buildTarGzBuffer };
