import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { z } from 'zod';

import { plainTextAtom, prettierOptionsAtom } from '@/shared-kernel/stores';
import { isTypeof } from '@/shared-kernel/utils';

import { v2Format, v3Format } from './libs';

export function useOutputArea(version: 2 | 3) {
  const plainText = useRecoilValue(plainTextAtom);
  const prettierOptions = useRecoilValue(prettierOptionsAtom);
  const [formattingResult, setFormattingResult] = useState<{
    type: 'normal' | 'error';
    text: string;
  }>({ type: 'normal', text: '' });

  useEffect(() => {
    async function formatAsync(text: string, options: any) {
      try {
        setFormattingResult({
          type: 'normal',
          text:
            version === 2
              ? v2Format(text, options)
              : await v3Format(text, options),
        });
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
          setFormattingResult({
            type: 'error',
            text: error.message,
          });
          return;
        }

        console.error(error);
      }
    }

    formatAsync(plainText, prettierOptions);
  }, [plainText, prettierOptions, version]);

  return {
    printWidth: prettierOptions.printWidth,
    formattingResult,
  };
}
