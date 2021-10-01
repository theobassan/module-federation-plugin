import { Compiler, WebpackPluginInstance } from 'webpack';
import { ModuleFederationPluginExpose } from './module-federation-plugin-expose';
import { ModuleFederationPluginRemote } from './module-federation-plugin-remote';

type ModuleFederationPluginOptions = {
    name: string;
    filename: string;
    exposes?: Record<string, string>;
    remotes?: Record<string, string>;
    shared?: Record<string, Record<string, string>>;
    propsRegex?: string;
    type?: 'react' | 'react-fc';
};

const hasAnyKey = (record?: Record<string, string>): boolean => record != undefined && Object.keys(record).length > 0;

class ModuleFederationPlugin implements WebpackPluginInstance {
    private options: ModuleFederationPluginOptions;

    constructor(options: ModuleFederationPluginOptions) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        if (hasAnyKey(this.options.exposes)) {
            const exposes = this.options.exposes as Record<string, string>;
            new ModuleFederationPluginExpose({
                name: this.options.name,
                filename: this.options.filename,
                exposes,
                shared: this.options.shared,
                propsRegex: this.options.propsRegex,
                type: this.options.type,
            }).apply(compiler);
        }

        if (hasAnyKey(this.options.remotes)) {
            const remotes = this.options.remotes as Record<string, string>;
            new ModuleFederationPluginRemote({
                name: this.options.name,
                filename: this.options.filename,
                remotes,
                shared: this.options.shared,
            }).apply(compiler);
        }
    }
}

export { ModuleFederationPlugin };
