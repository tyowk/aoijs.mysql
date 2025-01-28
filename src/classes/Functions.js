const { readdirSync, statSync } = require('node:fs');
const { blue, cyan, red } = require('chalk');
const { join } = require('node:path');

exports.Functions = class Functions {
    constructor(client, basePath, debug) {
        if (!basePath || !client) return;
        
        try {
            const files = readdirSync(basePath);
            for (const file of files) {
                const filePath = join(basePath, file);
                if (!statSync(filePath).isDirectory() && file.endsWith('.js')) {
                    const func = require(filePath);
                    const name = `$${file?.replaceAll('.js', '')}`;

                    if (typeof func !== 'function' && typeof func === 'object' && !Array.isArray(func)) {
                        client.functionManager.createFunction(func);
                        if (debug) this.#debug('success', func?.name || name);
                    } else if (typeof func === 'function') {
                        client.functionManager.createFunction({
                            name,
                            type: 'djs',
                            code: func,
                        });

                        if (debug) this.#debug('success', name);
                    } else {
                        this.#debug('error', name);
                    }
                } else {
                    new this.constructor(client, filePath, debug);
                }
            }
        } catch (err) {
            this.#debug('error', 'ALL', err);
        }
    }

    #debug(type, name, err) {
        if (type === 'success') {
            console.log(`[${blue('DEBUG')}] :: Function loaded: ${cyan(name)}`);
            if (err) console.error(err);
        } else if (type === 'error') {
            console.log(`[${blue('DEBUG')}] :: Failed to Load: ${red(name)}`);
            if (err) console.error(err);
        }
    }
};
