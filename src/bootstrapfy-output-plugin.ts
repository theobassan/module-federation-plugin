import { Compiler, WebpackPluginInstance } from 'webpack';
import path from 'path';
import os from 'os';
import VirtualModulesPlugin from 'webpack-virtual-modules';

const correctImportPath = (options: { context: string; entryFile: string }) => {
    if (os.platform() !== 'win32') {
        return options.entryFile;
    }

    if (options.entryFile.match(/^\.?\.\\/) || !options.entryFile.match(/^[A-Z]:\\\\/i)) {
        return options.entryFile.replace(/\\/g, '/');
    }

    const joint = path.win32.relative(options.context, options.entryFile);
    const relative = joint.replace(/\\/g, '/');

    if (relative.includes('node_modules/')) {
        return relative.split('node_modules/')[1];
    }

    return `./${relative}`;
};

type Entry = {
    main: {
        import: string[];
    };
};

class BootstrapfyOutputPlugin implements WebpackPluginInstance {
    apply(compiler: Compiler): void {
        new VirtualModulesPlugin({
            './__entry.js': `import('./__bootstrap.js');`,
            './__bootstrap.js': (compiler.options.entry as Entry).main.import
                .map(
                    (entryFile) =>
                        `import '${correctImportPath({
                            context: compiler.context || process.cwd(),
                            entryFile: entryFile,
                        })}';`,
                )
                .join('\n'),
        }).apply(compiler);

        compiler.options.entry = { main: { import: ['./__entry.js'] } };
        compiler.options.optimization =
            compiler.options.optimization != undefined
                ? {
                      ...compiler.options.optimization,
                      runtimeChunk: false,
                  }
                : { runtimeChunk: false };
        delete compiler.options.output.publicPath;
    }
}

export { BootstrapfyOutputPlugin };
