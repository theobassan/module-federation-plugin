import { buildExposedModuleTypesAny } from './exposed-module-types-any-builder';
import { buildExposedModuleTypesWithProps } from './exposed-module-types-with-props-builder';

const isEmpty = (str: string): boolean => str.length === 0 || !str.trim();
const isBlank = (str: string): boolean => isEmpty(str) || /^\s*$/.test(str);
const shouldCreateProps = (exposedPropsRegex?: string): boolean =>
    exposedPropsRegex != undefined && !isBlank(exposedPropsRegex);

const buildExposedModuleTypes = (options: {
    exposedModuleName: string;
    exposedFile: string;
    exposedPath: string;
    exposedModuleType?: 'react' | 'react-fc';
    exposedPropsRegex?: string;
}): Array<Record<string, string>> => {
    if (shouldCreateProps(options.exposedPropsRegex)) {
        return buildExposedModuleTypesWithProps({
            exposedModuleName: options.exposedModuleName,
            exposedFile: options.exposedFile,
            exposedPath: options.exposedPath,
            exposedPropsRegex: options.exposedPropsRegex as string,
            exposedModuleType: options.exposedModuleType,
        });
    } else {
        return buildExposedModuleTypesAny({
            exposedModuleName: options.exposedModuleName,
            exposedFile: options.exposedFile,
            exposedModuleType: options.exposedModuleType,
        });
    }
};

export { buildExposedModuleTypes };
