import { reactContent } from './content-builder-react';

const anyContent = (options: { exposedModuleName: string; exposedFileName: string }): string => {
    return `declare module "${options.exposedModuleName}/${options.exposedFileName}" {
  const ${options.exposedFileName}: any;

  export default ${options.exposedFileName};
}
`;
};

const buildContent = (options: {
    exposedModuleName: string;
    exposedFileName: string;
    exposedModuleType?: 'react' | 'react-fc';
}): string => {
    const exposedProsType = 'any';
    if (options.exposedModuleType === 'react') {
        return reactContent({ ...options, exposedProsType, exposedReactType: 'Component' });
    }
    if (options.exposedModuleType === 'react-fc') {
        return reactContent({ ...options, exposedProsType, exposedReactType: 'FC' });
    }

    return anyContent({ ...options });
};

const buildIndexContent = (exposedModuleName: string): string => {
    return `declare module "${exposedModuleName}";`;
};

export { buildContent, buildIndexContent };
