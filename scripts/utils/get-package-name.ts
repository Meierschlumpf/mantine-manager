export function getPackageName(input: string) {
  if (input.startsWith('@')) {
    return input;
  }

  // TODO: change accordingly
  return `@mantine/${input}`;
}
