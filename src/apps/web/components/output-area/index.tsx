import { classNames } from '@/adaptors';

import { useOutputArea } from './hooks';
import type { FormattingResult } from './types';

function LegacyOutputArea({
  title,
  formattingResult,
  backgroundPositionXInPixels,
}: {
  title: string;
  formattingResult: FormattingResult;
  backgroundPositionXInPixels: number;
}) {
  return (
    <div className="form-control h-full">
      <div className="label">
        <span className="label-text">{title}</span>
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
          backgroundPositionX: `${backgroundPositionXInPixels}px`,
        }}
      />
    </div>
  );
}

export function OutputArea() {
  const {
    printWidth,
    v2FormattingResult,
    v3FormattingResult,
    characterWidthInPixels,
  } = useOutputArea();

  const isSameResult = v2FormattingResult.text === v3FormattingResult.text;

  const textareaLeftPaddingInPixels = 8;
  const backgroundPositionXInPixels =
    textareaLeftPaddingInPixels + characterWidthInPixels * printWidth;

  return (
    <div className="flex h-full flex-col">
      {isSameResult ? (
        <div className="flex-grow">
          <LegacyOutputArea
            title="Output"
            formattingResult={v2FormattingResult}
            backgroundPositionXInPixels={backgroundPositionXInPixels}
          />
        </div>
      ) : (
        <>
          <div className="flex-grow">
            <LegacyOutputArea
              title="Output (v2.8.4)"
              formattingResult={v2FormattingResult}
              backgroundPositionXInPixels={backgroundPositionXInPixels}
            />
          </div>
          <div className="flex-grow">
            <LegacyOutputArea
              title="Output (v3.0.3)"
              formattingResult={v3FormattingResult}
              backgroundPositionXInPixels={backgroundPositionXInPixels}
            />
          </div>
        </>
      )}
    </div>
  );
}
