import { Compiler, container, WebpackPluginInstance } from 'webpack';
import { download } from './download';

interface ModuleFederationRemoteTypesPluginOptions {
    name: string;
    filename: string;
    remotes: Record<string, string>;
    shared?: Record<string, Record<string, string>>;
}

class ModuleFederationRemoteTypesPlugin implements WebpackPluginInstance {
    private options: ModuleFederationRemoteTypesPluginOptions;

    constructor(options: ModuleFederationRemoteTypesPluginOptions) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        const { ModuleFederationPlugin } = container;

        new ModuleFederationPlugin({
            name: this.options.name,
            filename: this.options.filename,
            remotes: this.options.remotes,
            shared: this.options.shared,
        }).apply(compiler);

        compiler.hooks.thisCompilation.tap('ModuleFederationRemoteTypesPlugin', async () => {
            await download(this.options.remotes);
        });
    }
}

export { ModuleFederationRemoteTypesPlugin };
