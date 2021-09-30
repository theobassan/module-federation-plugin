import { Compiler, WebpackPluginInstance } from 'webpack';
import { ModuleFederationPluginExpose } from './module-federation-plugin-expose';
import { ModuleFederationPluginRemote } from './module-federation-plugin-remote';

interface ModuleFederationPluginOptions {
    name: string;
    filename: string;
    exposes?: Record<string, string>;
    remotes?: Record<string, string>;
    shared?: Record<string, Record<string, string>>;
    propsRegex?: string;
    type?: 'react' | 'react-fc';
}

class ModuleFederationPlugin implements WebpackPluginInstance {
    private options: ModuleFederationPluginOptions;

    constructor(options: ModuleFederationPluginOptions) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        if (this.options.exposes != null && Object.keys(this.options.exposes).length > 0) {
            new ModuleFederationPluginExpose({
                name: this.options.name,
                filename: this.options.filename,
                exposes: this.options.exposes,
                shared: this.options.shared,
                propsRegex: this.options.propsRegex,
                type: this.options.type,
            }).apply(compiler);
        }

        if (this.options.remotes != null && Object.keys(this.options.remotes).length > 0) {
            new ModuleFederationPluginRemote({
                name: this.options.name,
                filename: this.options.filename,
                remotes: this.options.remotes,
                shared: this.options.shared,
            }).apply(compiler);
        }
    }
}

export { ModuleFederationPlugin };
