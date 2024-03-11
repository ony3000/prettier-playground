import type {
  EditableBooleanOption,
  EditableNumberOption,
  EditableChoiceOption,
} from './types';

export function BooleanOptionItem({
  option,
}: {
  option: EditableBooleanOption;
}) {
  return (
    <li className="flex min-h-[36px] items-center justify-between px-4">
      <span>{option.name}</span>
      <input
        type="checkbox"
        className="toggle-primary toggle toggle-md"
      />
    </li>
  );
}

export function NumberOptionItem({ option }: { option: EditableNumberOption }) {
  return (
    <li className="flex min-h-[36px] items-center justify-between px-4">
      <span>{option.name}</span>
      <input
        type="number"
        className="input-bordered input-primary input input-xs w-20"
        min={0}
        defaultValue={option.defaultValue}
      />
    </li>
  );
}

export function ChoiceOptionItem({ option }: { option: EditableChoiceOption }) {
  return (
    <li className="flex min-h-[36px] items-center justify-between px-4">
      <span>{option.name}</span>
      <select
        className="select-primary select select-xs"
        defaultValue={option.defaultValue}
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
