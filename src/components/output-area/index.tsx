import { useOutputArea } from './hooks';

export function OutputArea({ version }: { version: 2 | 3 }) {
  const { formattingResult } = useOutputArea(version);
  const prettierVersion = version === 2 ? '2.8.4' : '3.0.3';

  return (
    <label className="form-control h-full">
      <div className="label">
        <span className="label-text">Output (v{prettierVersion})</span>
      </div>
      <textarea
        readOnly
        className="textarea-bordered textarea textarea-xs h-full resize-none
          whitespace-pre font-mono"
        value={formattingResult}
      />
    </label>
  );
}
