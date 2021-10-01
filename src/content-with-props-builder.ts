import fs from 'fs';
import { reactContent } from './content-builder-react';

const buildPropsContent = (options: {
    exposedFileName: string;
    exposedFilePath: string;
    exposedPropsRegex: string;
}): string => {
    const propsFileName = `${options.exposedFileName}${options.exposedPropsRegex}`;
    const propsFilePath = `${options.exposedFilePath.split(options.exposedFileName)[0]}${propsFileName}.ts`;

    const propsFileContent = fs.readFileSync(propsFilePath, 'utf-8');

    return propsFileContent;
};

const anyContent = (options: { exposedModuleName: string; exposedFileName: string }): string => {
    return `declare module "${options.exposedModuleName}/${options.exposedFileName}" {
  const ${options.exposedFileName}: any;

  export default ${options.exposedFileName};
}
`;
};

const buildContentWithProps = (options: {
    exposedModuleName: string;
    exposedFileName: string;
    exposedPropsRegex: string;
    exposedModuleType?: 'react' | 'react-fc';
}): string => {
    const propsFileName = `${options.exposedFileName}${options.exposedPropsRegex}`;
    const exposedProsType = `import("./${propsFileName}").${propsFileName}`;

    if (options.exposedModuleType === 'react') {
        return reactContent({ ...options, exposedProsType, exposedReactType: 'Component' });
    }
    if (options.exposedModuleType === 'react-fc') {
        return reactContent({ ...options, exposedProsType, exposedReactType: 'FC' });
    }

    return anyContent({ ...options });
};

export { buildPropsContent, buildContentWithProps };
