import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { z } from 'zod';

import { plainTextAtom, prettierOptionsAtom } from '@/shared-kernel/stores';
import { isTypeof, sha1 } from '@/shared-kernel/utils';

import { v2Format, v3Format } from './libs';
import type { FormattingResult } from './types';

const errorPlaceholder: FormattingResult = {
  type: 'error',
  text: 'Error: See Developer Tools.',
};

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
    const jsonData: {
      v2Result: FormattingResult;
      v3Result: FormattingResult;
    } = await response.json();

    v2Result = jsonData.v2Result;
    v3Result = jsonData.v3Result;
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
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  return {
    v2Result,
    v3Result,
  };
}

export function useOutputArea() {
  const plainText = useRecoilValue(plainTextAtom);
  const prettierOptions = useRecoilValue(prettierOptionsAtom);
  const [characterWidthInPixels, setCharacterWidthInPixels] = useState(NaN);

  const { data, error } = useQuery({
    queryKey: [
      sha1(
        JSON.stringify({
          source: plainText,
          options: prettierOptions,
        }),
      ),
    ],
    queryFn: () => formatAsync(plainText, prettierOptions),
    staleTime: 86400 * 1000,
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

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
    v2FormattingResult: data?.v2Result ?? errorPlaceholder,
    v3FormattingResult: data?.v3Result ?? errorPlaceholder,
    characterWidthInPixels,
  };
}
