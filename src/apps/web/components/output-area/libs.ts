import { format as format2 } from 'prettier2';
import babelPlugin2 from 'prettier2/parser-babel';
import htmlPlugin2 from 'prettier2/parser-html';
import typescriptPlugin2 from 'prettier2/parser-typescript';
import babelPlugin3 from 'prettier3/plugins/babel';
import estreePlugin3 from 'prettier3/plugins/estree';
import htmlPlugin3 from 'prettier3/plugins/html';
import typescriptPlugin3 from 'prettier3/plugins/typescript';
import { format as format3 } from 'prettier3/standalone';

export function v2Format(
  ...[source, options]: Parameters<typeof format2>
): string {
  return format2(source, {
    ...options,
    plugins: [babelPlugin2, htmlPlugin2, typescriptPlugin2],
  });
}

export async function v3Format(
  ...[source, options]: Parameters<typeof format3>
): Promise<string> {
  return format3(source, {
    ...options,
    plugins: [babelPlugin3, estreePlugin3, htmlPlugin3, typescriptPlugin3],
  });
}
