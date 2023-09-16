/* eslint-disable no-param-reassign, no-restricted-syntax, no-continue, no-await-in-loop */
import { getPackagesList, Package } from './get-packages-list';

export async function getPackagesBuildOrder(packages?: Package[]) {
  return packages || (await getPackagesList());
}
