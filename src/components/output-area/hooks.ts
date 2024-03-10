import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { plainTextAtom } from '@/shared-kernel/stores';

function format2(input: string, options: any): string {
  return input;
}

async function format3(input: string, options: any): Promise<string> {
  return input;
}

export function useOutputArea(version: 2 | 3) {
  const plainText = useRecoilValue(plainTextAtom);
  const [formattingResult, setFormattingResult] = useState('');

  useEffect(() => {
    async function formatAsync(text: string, options: any) {
      try {
        setFormattingResult(
          version === 2 ? format2(text, options) : await format3(text, options),
        );
      }
      catch (err) {
        console.warn(err);
      }
    }

    formatAsync(plainText, {});
  }, [plainText, version]);

  return {
    formattingResult,
  };
}
