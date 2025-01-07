const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async (directory, db) => {
    const backupDir = path.join(process.cwd(), directory);
    const spinner = ora().start();

    if (!fs.existsSync(backupDir)) {
        spinner.fail(`The "${chalk.red(directory)}" folder does not exist.`);
        return;
    }

    const directories = fs.readdirSync(backupDir);
    let totalKeys = 0;
    let index = 1;

    spinner.text = `${chalk.cyan('Starting backup...')}`;

    for (const dir of directories) {
        if (['reference', '.backup', 'transaction'].includes(dir)) continue;
        const dirPath = path.join(backupDir, dir);
        if (fs.statSync(dirPath).isDirectory()) {
            const files = fs.readdirSync(dirPath);
            spinner.succeed(`Found ${chalk.cyan(files.length)} files in ${chalk.cyan(dir)}.`);
            spinner.start('Scanning files...');
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const databaseData = fs.readFileSync(filePath);
                const data = JSON.parse(databaseData);
                totalKeys += Object.keys(data).length;
            }
        }
    }

    spinner.succeed(`Estimated time for backup: ${chalk.cyan((totalKeys * 75) / 1000)} seconds.`);
    spinner.start(`This may take a while depending on the amount of data. Canceling will lose current progress.`);
    spinner.succeed(`Found ${chalk.cyan(totalKeys)} keys to transfer.`);

    for (const dir of directories) {
        if (['reference', '.backup', 'transaction'].includes(dir)) continue;
        const dirPath = path.join(backupDir, dir);

        if (fs.statSync(dirPath).isDirectory()) {
            const files = fs.readdirSync(dirPath);
            spinner.start('Getting ready to backup (this may take a while depending on the amount of data)...');

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const databaseData = fs.readFileSync(filePath);
                const data = JSON.parse(databaseData);
                await delay(1000);
                const tableName = file.split('_scheme_')[0];
                spinner.start(
                    `[${file.split('_scheme_')[1]?.replace('.sql', '')}]: Transferring data from table ${chalk.cyan(tableName)}...`,
                );
                await delay(2000);
                for (const [key, value] of Object.entries(data)) {
                    const start = process.hrtime.bigint();
                    spinner.text = `[${index}/${totalKeys}]: Processing ${chalk.cyan(key)}...`;

                    if (!value.hasOwnProperty('value') || !key) {
                        spinner.fail(`[${index}/${totalKeys}]: No data found for ${chalk.red(key)}`);
                        continue;
                    }
                    spinner.start(
                        `[${index}/${totalKeys}]: Setting ${chalk.cyan(key)} to '${chalk.cyan(value.value).slice(0, 15)}'`,
                    );
                    try {
                        const keySplit = key.split('_');
                        if (typeof value.value === 'object') {
                            try {
                                value.value = JSON.stringify(value.value);
                            } catch {
                                // yea yea i agree.
                            }
                        }

                        await db.set(tableName, keySplit[0], keySplit[1], value.value);
                        const end = (Number(process.hrtime.bigint() - start) / 1e6).toFixed(2);
                        spinner.succeed(
                            `[${index}/${totalKeys}] [${end}ms]: ${chalk.cyan(key)} processed successfully.`,
                        );
                    } catch (err) {
                        spinner.fail(`[${index}/${totalKeys}]: Failed to write ${chalk.red(key)}: ${err.message}`);
                    }
                    index++;
                }
            }
        }
    }
    spinner.succeed(`${chalk.cyan('Transfer completed!')}`);
};

/**
 * CREDITS
 * Thanks to fafa ✨
 * https://github.com/faf4a/aoi.mongo
 */
