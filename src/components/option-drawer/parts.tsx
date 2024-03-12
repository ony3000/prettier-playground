import type {
  EditableBooleanOption,
  EditableNumberOption,
  EditableChoiceOption,
} from './types';

export function BooleanOptionItem({
  option,
  onChange = undefined,
}: {
  option: EditableBooleanOption;
  onChange?: (newValue: boolean) => void;
}) {
  return (
    <li className="flex min-h-[36px] items-center justify-between px-4">
      <span>{option.name}</span>
      <input
        type="checkbox"
        className="toggle-primary toggle toggle-md"
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </li>
  );
}

export function NumberOptionItem({
  option,
  onChange = undefined,
}: {
  option: EditableNumberOption;
  onChange?: (newValue: number) => void;
}) {
  return (
    <li className="flex min-h-[36px] items-center justify-between px-4">
      <span>{option.name}</span>
      <input
        type="number"
        className="input-bordered input input-xs w-20 focus:input-primary"
        min={0}
        defaultValue={option.defaultValue}
        onInput={(e) => onChange?.(Number(e.target.value))}
      />
    </li>
  );
}

export function ChoiceOptionItem({
  option,
  onChange = undefined,
}: {
  option: EditableChoiceOption;
  onChange?: (newValue: string) => void;
}) {
  return (
    <li className="flex min-h-[36px] items-center justify-between px-4">
      <span>{option.name}</span>
      <select
        className="select-bordered select select-xs focus:select-primary"
        defaultValue={option.defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {option.values.map((value) => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </li>
  );
}
