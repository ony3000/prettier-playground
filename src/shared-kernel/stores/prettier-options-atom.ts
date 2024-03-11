import { atom } from 'recoil';

export const prettierOptionsAtom = atom<PrettierOptions>({
  key: 'prettierOptionsAtom',
  default: {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    jsxBracketSameLine: false,
    rangeStart: 0,
    rangeEnd: Infinity,
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve',
    arrowParens: 'always',
    htmlWhitespaceSensitivity: 'css',
    endOfLine: 'lf',
    quoteProps: 'as-needed',
    vueIndentScriptAndStyle: false,
    embeddedLanguageFormatting: 'auto',
    singleAttributePerLine: false,
  },
});
