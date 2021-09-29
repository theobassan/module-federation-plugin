import path from 'path';

import { buildContent, buildPropsContent } from './content-builder';

const cwd = process.cwd();

const buildExposedModuleTypes = (
    exposedModuleName: string,
    exposedFile: string,
    exposedPath: string,
    exposedModuleType?: 'react' | 'react-fc',
    exposedPropsRegex?: string,
): Array<Record<string, string>> => {
    const data: Array<Record<string, string>> = [];

    const exposedFilePath = path.resolve(cwd, exposedPath);
    const exposedFileName = exposedFile.replace('./', '');

    const filename = `${exposedFileName}.d.ts`;
    const content = buildContent(exposedModuleName, exposedFileName, exposedModuleType, exposedPropsRegex);

    data.push({
        name: filename,
        content: content,
    });

    if (exposedPropsRegex != null && exposedPropsRegex !== '') {
        const propsFilename = `${exposedFileName}${exposedPropsRegex}.d.ts`;
        const propsContent = buildPropsContent(exposedFileName, exposedFilePath, exposedPropsRegex);

        data.push({
            name: propsFilename,
            content: propsContent,
        });
    }

    return data;
};

export { buildExposedModuleTypes };
