import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { z } from 'zod';

import { plainTextAtom, prettierOptionsAtom } from '@/shared-kernel/stores';
import { isTypeof } from '@/shared-kernel/utils';

import { v2Format, v3Format } from './libs';
import type { FormattingResult } from './types';

const apiErrorPlaceholder: FormattingResult = {
  type: 'error',
  text: 'Formatting for this parser is supported only on the localhost.',
};

export function useOutputArea() {
  const plainText = useRecoilValue(plainTextAtom);
  const prettierOptions = useRecoilValue(prettierOptionsAtom);
  const [v2FormattingResult, setV2FormattingResult] =
    useState<FormattingResult>({
      type: 'normal',
      text: '',
    });
  const [v3FormattingResult, setV3FormattingResult] =
    useState<FormattingResult>({
      type: 'normal',
      text: '',
    });
  const [characterWidthInPixels, setCharacterWidthInPixels] = useState(
    Number.NaN,
  );

  useEffect(() => {
    async function formatAsync(text: string, options: PrettierOptions) {
      let v2Result: FormattingResult = {
        type: 'normal',
        text: '',
      };
      let v3Result: FormattingResult = {
        type: 'normal',
        text: '',
      };

      if (options.parser === 'astro') {
        const response = await fetch('/api/format', {
          method: 'POST',
          body: JSON.stringify({
            source: text,
            options,
          }),
        });

        if (response.status >= 400 && response.status < 500) {
          v2Result = apiErrorPlaceholder;
          v3Result = apiErrorPlaceholder;
        }
        else {
          const jsonData: {
            v2Result: FormattingResult;
            v3Result: FormattingResult;
          } = await response.json();

          v2Result = jsonData.v2Result;
          v3Result = jsonData.v3Result;
        }
      }
      else {
        try {
          v2Result.text = v2Format(text, options);
        }
        catch (error) {
          if (
            isTypeof(
              error,
              z.object({
                message: z.string(),
              }),
            )
          ) {
            v2Result = {
              type: 'error',
              text: error.message,
            };
          }
          else {
            console.error(error);
          }
        }

        try {
          v3Result.text = await v3Format(text, options);
        }
        catch (error) {
          if (
            isTypeof(
              error,
              z.object({
                message: z.string(),
              }),
            )
          ) {
            v3Result = {
              type: 'error',
              text: error.message,
            };
          }
          else {
            console.error(error);
          }
        }
      }

      setV2FormattingResult(v2Result);
      setV3FormattingResult(v3Result);
    }

    formatAsync(plainText, prettierOptions);
  }, [plainText, prettierOptions]);

  useEffect(() => {
    if (Number.isNaN(characterWidthInPixels)) {
      const element = document.createElement('span');

      element.className = 'invisible fixed font-mono text-xs';
      element.innerText = 'x'; // any single character

      document.body.appendChild(element);

      const singleCharacterWidth = Number.parseFloat(
        window.getComputedStyle(element).width,
      );

      document.body.removeChild(element);

      setCharacterWidthInPixels(singleCharacterWidth);
    }
  }, [characterWidthInPixels]);

  return {
    printWidth: prettierOptions.printWidth,
    v2FormattingResult,
    v3FormattingResult,
    characterWidthInPixels,
  };
}
