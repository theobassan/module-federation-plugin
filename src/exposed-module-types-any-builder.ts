import { buildContent } from './content-builder';

const buildExposedModuleTypesAny = (options: {
    exposedModuleName: string;
    exposedFile: string;
    exposedModuleType?: 'react' | 'react-fc';
}): Array<Record<string, string>> => {
    const exposedFileName = options.exposedFile.replace('./', '');
    const content = buildContent({
        exposedModuleName: options.exposedModuleName,
        exposedFileName,
        exposedModuleType: options.exposedModuleType,
    });

    return [
        {
            name: `${exposedFileName}.d.ts`,
            content: content,
        },
    ];
};

export { buildExposedModuleTypesAny };
