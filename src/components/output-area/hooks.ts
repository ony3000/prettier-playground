import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { z } from 'zod';

import { plainTextAtom } from '@/shared-kernel/stores';
import { isTypeof } from '@/shared-kernel/utils';

import { v2Format, v3Format } from './libs';

// temporary use
const prettierOptions: any = {
  parser: 'babel',
};

export function useOutputArea(version: 2 | 3) {
  const plainText = useRecoilValue(plainTextAtom);
  const [formattingResult, setFormattingResult] = useState('');

  useEffect(() => {
    async function formatAsync(text: string, options: any) {
      try {
        setFormattingResult(
          version === 2
            ? v2Format(text, options)
            : await v3Format(text, options),
        );
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
          setFormattingResult(error.message);
          return;
        }

        console.error(error);
      }
    }

    formatAsync(plainText, prettierOptions);
  }, [plainText, version]);

  return {
    formattingResult,
  };
}