import fs from 'fs-extra';
import path from 'path';
import isDir from 'is-directory';
import chalk from 'chalk';
import { Logger } from './utils/Logger';

const logger = new Logger('check-conflicts');

const packages = path.join(__dirname, '../packages');

const errors: string[] = fs
  .readdirSync(packages)
  .filter((folder) => isDir.sync(path.join(packages, folder)))
  .reduce<string[]>((acc, folder) => {
    try {
      fs.readJsonSync(path.join(packages, folder, 'package.json'));
      return acc;
    } catch (err) {
      acc.push(folder);
      return acc;
    }
  }, []);

try {
  fs.readJsonSync(path.join(__dirname, '../package.json'));
} catch (err) {
  errors.push('root');
}

if (errors.length === 0) {
  logger.success('All package.json files are valid');
  process.exit(0);
} else {
  logger.error(`package.json files with conflicts: ${chalk.red(errors.join(', '))}`);
  process.exit(1);
}
