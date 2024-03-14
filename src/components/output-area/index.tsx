import { classNames } from '@/adaptors';

import { useOutputArea } from './hooks';

export function OutputArea({ version }: { version: 2 | 3 }) {
  const { printWidth, formattingResult, characterWidthInPixels } =
    useOutputArea(version);
  const prettierVersion = version === 2 ? '2.8.4' : '3.0.3';

  const textareaLeftPaddingInPixels = 8;

  return (
    <div className="form-control h-full">
      <div className="label">
        <span className="label-text">Output (v{prettierVersion})</span>
      </div>
      <textarea
        readOnly
        className={classNames(
          `textarea-bordered textarea textarea-xs h-full resize-none
          whitespace-pre font-mono`,
          { 'textarea-error bg-error/10': formattingResult.type === 'error' },
          {
            'bg-gradient-to-r from-neutral/30 to-neutral/30 bg-no-repeat':
              formattingResult.type === 'normal',
          },
        )}
        value={formattingResult.text}
        style={{
          backgroundPositionX: `${
            textareaLeftPaddingInPixels + characterWidthInPixels * printWidth
          }px`,
        }}
      />
    </div>
  );
}
