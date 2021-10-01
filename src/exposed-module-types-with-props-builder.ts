import path from 'path';

import { buildPropsContent, buildContentWithProps } from './content-with-props-builder';

const cwd = process.cwd();

const buildExposedModuleTypesWithProps = (options: {
    exposedModuleName: string;
    exposedFile: string;
    exposedPath: string;
    exposedPropsRegex: string;
    exposedModuleType?: 'react' | 'react-fc';
}): Array<Record<string, string>> => {
    const exposedFileName = options.exposedFile.replace('./', '');
    return [
        {
            name: `${exposedFileName}${options.exposedPropsRegex}.d.ts`,
            content: buildPropsContent({
                exposedFileName,
                exposedFilePath: path.resolve(cwd, options.exposedPath),
                exposedPropsRegex: options.exposedPropsRegex,
            }),
        },
        {
            name: `${exposedFileName}.d.ts`,
            content: buildContentWithProps({
                exposedModuleName: options.exposedModuleName,
                exposedFileName,
                exposedPropsRegex: options.exposedPropsRegex,
                exposedModuleType: options.exposedModuleType,
            }),
        },
    ];
};

export { buildExposedModuleTypesWithProps };
