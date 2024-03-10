import { format as format2 } from 'prettier2';
import babelPlugin2 from 'prettier2/parser-babel';
import htmlPlugin2 from 'prettier2/parser-html';
import typescriptPlugin2 from 'prettier2/parser-typescript';

export function v2Format(
  ...[source, options]: Parameters<typeof format2>
): string {
  return format2(source, {
    ...options,
    plugins: [babelPlugin2, htmlPlugin2, typescriptPlugin2],
  });
}

export async function v3Format(source: string, options?: any): Promise<string> {
  return source;
}
