import path from 'path';
import fs from 'fs-extra';

async function writeVersionToPackageJson(filePath: string, version: string) {
  const current = await fs.readJSON(filePath);
  current.version = version;

  await fs.writeJSON(filePath, current, { spaces: 2 });
}

export async function setPackagesVersion(version: string) {
  const packages = path.join(__dirname, '../../packages');

  const folders = (await fs.readdir(packages)).filter((folder) =>
    fs.pathExistsSync(path.join(packages, folder, '/package.json'))
  );

  await Promise.all(
    folders.map((folder) =>
      writeVersionToPackageJson(path.join(packages, folder, '/package.json'), version)
    )
  );

  await writeVersionToPackageJson(path.join(__dirname, '../../package.json'), version);
}
