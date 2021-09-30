import { Compiler, container, WebpackPluginInstance } from 'webpack';
import { download } from './download';

interface ModuleFederationPluginRemoteOptions {
    name: string;
    filename: string;
    remotes: Record<string, string>;
    shared?: Record<string, Record<string, string>>;
}

class ModuleFederationPluginRemote implements WebpackPluginInstance {
    private options: ModuleFederationPluginRemoteOptions;

    constructor(options: ModuleFederationPluginRemoteOptions) {
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

        compiler.hooks.thisCompilation.tap('ModuleFederationPluginRemote', async () => {
            await download(this.options.remotes);
        });
    }
}

export { ModuleFederationPluginRemote };