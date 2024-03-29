import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { z } from 'zod';

import { plainTextAtom, prettierOptionsAtom } from '@/shared-kernel/stores';
import { isTypeof } from '@/shared-kernel/utils';

import { v2Format, v3Format } from './libs';
import type { FormattingResult } from './types';

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
  const [characterWidthInPixels, setCharacterWidthInPixels] = useState(NaN);

  useEffect(() => {
    async function formatAsync(text: string, options: any) {
      let v2Result: FormattingResult = {
        type: 'normal',
        text: '',
      };
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
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }

      let v3Result: FormattingResult = {
        type: 'normal',
        text: '',
      };
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
          // eslint-disable-next-line no-console
          console.error(error);
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
