const reactContent = (options: {
    exposedModuleName: string;
    exposedFileName: string;
    exposedProsType: string;
    exposedReactType: 'Component' | 'FC';
}): string => {
    return `/// <reference types="react" />
  
declare module "${options.exposedModuleName}/${options.exposedFileName}" {
  const ${options.exposedFileName}: React.${options.exposedReactType}<${options.exposedProsType}>;

  export default ${options.exposedFileName};
}
`;
};

export { reactContent };
