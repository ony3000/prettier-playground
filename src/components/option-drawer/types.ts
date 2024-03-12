type PickByTypeOfValue<T> = {
  [prop in keyof PrettierOptions as PrettierOptions[prop] extends T
    ? prop
    : never]: PrettierOptions[prop];
};

export type EditableBooleanOption = {
  type: 'boolean';
  name: keyof PickByTypeOfValue<boolean>;
  defaultValue: boolean;
};

export type EditableNumberOption = {
  type: 'number';
  name: keyof PickByTypeOfValue<number>;
  defaultValue: number;
};

export type EditableChoiceOption = {
  type: 'choice';
  name: keyof PickByTypeOfValue<string>;
  values: string[];
  defaultValue: string;
};

export type EditableOption =
  | EditableBooleanOption
  | EditableNumberOption
  | EditableChoiceOption;
