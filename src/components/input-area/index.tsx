export function InputArea() {
  return (
    <label className="form-control h-full">
      <div className="label">
        <span className="label-text">Input</span>
      </div>
      <textarea
        className="textarea-bordered textarea textarea-xs h-full resize-none
          whitespace-pre font-mono"
      />
    </label>
  );
}
