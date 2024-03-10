import type { ZodTypeAny, infer as ZodInfer } from 'zod';

export function isTypeof<T extends ZodTypeAny>(
  arg: unknown,
  expectedSchema: T,
): arg is ZodInfer<T> {
  return expectedSchema.safeParse(arg).success;
}
