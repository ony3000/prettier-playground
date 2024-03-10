export function OutputArea() {
  return (
    <label className="form-control h-full">
      <div className="label">
        <span className="label-text">Output</span>
      </div>
      <textarea
        readOnly
        className="textarea-bordered textarea textarea-xs h-full resize-none
          whitespace-pre font-mono"
      />
    </label>
  );
}
