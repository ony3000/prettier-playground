declare global {
  type PrettierOptions = {
    printWidth: number;
    tabWidth: number;
    useTabs: boolean;
    semi: boolean;
    singleQuote: boolean;
    jsxSingleQuote: boolean;
    trailingComma: 'all' | 'none' | 'es5';
    bracketSpacing: boolean;
    bracketSameLine: boolean;
    jsxBracketSameLine: boolean;
    rangeStart: number;
    rangeEnd: number;
    requirePragma: boolean;
    insertPragma: boolean;
    proseWrap: 'preserve' | 'always' | 'never';
    arrowParens: 'always' | 'avoid';
    htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore';
    endOfLine: 'lf' | 'auto' | 'crlf' | 'cr';
    quoteProps: 'preserve' | 'as-needed' | 'consistent';
    vueIndentScriptAndStyle: boolean;
    embeddedLanguageFormatting: 'auto' | 'off';
    singleAttributePerLine: boolean;
  };
}

export {};
