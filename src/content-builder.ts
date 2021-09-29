import fs from 'fs';

const buildPropsContent = (exposedFileName: string, exposedFilePath: string, exposedPropsRegex: string): string => {
    const propsFileName = `${exposedFileName}${exposedPropsRegex}`;
    const propsFilePath = `${exposedFilePath.split(exposedFileName)[0]}${propsFileName}.ts`;

    const propsFileContent = fs.readFileSync(propsFilePath, 'utf-8');

    return propsFileContent;
};

const reactFcContent = (exposedModuleName: string, exposedFileName: string, exposedPropsRegex?: string): string => {
    let propsType = 'any';
    if (exposedPropsRegex != null && exposedPropsRegex !== '') {
        const propsFileName = `${exposedFileName}${exposedPropsRegex}`;
        propsType = `import("./${propsFileName}").${propsFileName}`;
    }

    return `/// <reference types="react" />
  
declare module "${exposedModuleName}/${exposedFileName}" {
  const ${exposedFileName}: React.FC<${propsType}>;

  export default ${exposedFileName};
}
`;
};

const reactContent = (exposedModuleName: string, exposedFileName: string, exposedPropsRegex?: string): string => {
    let propsType = 'any';
    if (exposedPropsRegex != null && exposedPropsRegex !== '') {
        const propsFileName = `${exposedFileName}${exposedPropsRegex}`;
        propsType = `import("./${propsFileName}").${propsFileName}`;
    }

    return `/// <reference types="react" />
  
declare module "${exposedModuleName}/${exposedFileName}" {
  const ${exposedFileName}: React.Component<${propsType}>;

  export default ${exposedFileName};
}
`;
};

const anyContent = (exposedModuleName: string, exposedFileName: string): string => {
    return `declare module "${exposedModuleName}/${exposedFileName}" {
  const ${exposedFileName}: any;

  export default ${exposedFileName};
}
`;
};

const buildContent = (
    exposedModuleName: string,
    exposedFileName: string,
    exposedModuleType?: 'react' | 'react-fc',
    exposedPropsRegex?: string,
): string => {
    if (exposedModuleType === 'react') {
        return reactContent(exposedModuleName, exposedFileName, exposedPropsRegex);
    }
    if (exposedModuleType === 'react-fc') {
        return reactFcContent(exposedModuleName, exposedFileName, exposedPropsRegex);
    }

    return anyContent(exposedModuleName, exposedFileName);
};

const buildIndexContent = (exposedModuleName: string): string => {
    return `declare module "${exposedModuleName}";`;
};

export { buildPropsContent, buildContent, buildIndexContent };
