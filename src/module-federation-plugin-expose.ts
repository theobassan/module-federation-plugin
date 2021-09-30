import { Compiler, Compilation, container, WebpackPluginInstance, sources } from 'webpack';
import { buildTarGzBuffer } from './tar-gz-buffer-builder';

export interface ModuleFederationPluginExposeOptions {
    name: string;
    filename: string;
    exposes: Record<string, string>;
    shared?: Record<string, Record<string, string>>;
    propsRegex?: string;
    type?: 'react' | 'react-fc';
}

const getModuleFederationEmitPath = (exposedModuleFileName: string): string => {
    if (exposedModuleFileName.indexOf('/') > -1) {
        const splited = exposedModuleFileName.split('/');
        splited.pop();

        return `${splited.join('/')}/`;
    }
    return '';
};

class ModuleFederationPluginExpose implements WebpackPluginInstance {
    private options: ModuleFederationPluginExposeOptions;

    constructor(options: ModuleFederationPluginExposeOptions) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        const { ModuleFederationPlugin } = container;

        new ModuleFederationPlugin({
            name: this.options.name,
            filename: this.options.filename,
            exposes: this.options.exposes,
            shared: this.options.shared,
        }).apply(compiler);

        compiler.hooks.thisCompilation.tap('ModuleFederationPluginExpose', (compilation: Compilation) => {
            const exposedModuleComponents = this.options.exposes ?? {};
            const exposedModuleName = this.options.name ?? 'app';
            const exposedModuleType = this.options.type;

            console.log(`[ModuleFederationPluginExpose] Generating module "${exposedModuleName}" type files`);

            const outputPath = getModuleFederationEmitPath(this.options.filename);
            const outputFileName = `${outputPath}${exposedModuleName}.tar.gz`;
            const tarGzBuffer = buildTarGzBuffer(
                exposedModuleComponents,
                exposedModuleName,
                exposedModuleType,
                this.options.propsRegex,
            );

            compilation.emitAsset(outputFileName, new sources.RawSource(tarGzBuffer));
        });
    }
}

export { ModuleFederationPluginExpose };
