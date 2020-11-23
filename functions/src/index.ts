'use strict';

import * as glob from 'glob';
import * as camelCase from 'camelcase';

interface NodeModuleImport {
    [key: string]:
    NodeRequire
}
interface ModuleExport {
    [key: string]:
    | undefined
    | null
    | string
    | NodeModuleImport
}
const keyExports: string[] = ['FUNCTION_1', 'FUNCTION_2', 'FUNCTION_3'];

const loadModules = (key: string) => {
    const obj: NodeModuleImport = {};
    const files = glob.sync(`./${key}/**/FUNC/**/*.js`, { cwd: __dirname, ignore: './node_modules/**' });
    files.forEach((file: string) => {
        const functionName = camelCase(file.slice(0, -3).split('/').filter(s => s !== "FUNC").slice(2).join('_'));
        obj[functionName] = require(file);
    });
    return obj;
}
const o: ModuleExport = {};
keyExports.forEach(key => {
    exports[key] = loadModules(key)
    o[key] = loadModules(key)
});
