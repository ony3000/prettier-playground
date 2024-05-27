import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import type { FormattingResult } from '@/components/output-area/types';
import { isTypeof } from '@/shared-kernel/utils';

type ResponseData = {
  v2Result: FormattingResult;
  v3Result: FormattingResult;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>,
) {
  if (req.method !== 'POST') {
    res.status(405).send(null);
    return;
  }

  let payload: { source: string; options: PrettierOptions };

  try {
    payload = JSON.parse(req.body);
  }
  catch (error) {
    res.status(400).send(null);
    return;
  }

  let v2Result: FormattingResult = {
    type: 'normal',
    text: '',
  };
  let v3Result: FormattingResult = {
    type: 'normal',
    text: '',
  };

  try {
    v2Result.text = payload.source;
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
    v3Result.text = payload.source;
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

  res.status(200).json({
    v2Result,
    v3Result,
  });
}
