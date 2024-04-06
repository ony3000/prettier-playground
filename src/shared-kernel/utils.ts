import { createHash } from 'crypto';
import type { ZodTypeAny, infer as ZodInfer } from 'zod';

export function isTypeof<T extends ZodTypeAny>(
  arg: unknown,
  expectedSchema: T,
): arg is ZodInfer<T> {
  return expectedSchema.safeParse(arg).success;
}

export function sha1(input: string): string {
  return createHash('sha1').update(input).digest('hex');
}
