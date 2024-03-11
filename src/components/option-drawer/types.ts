export type EditableBooleanOption = {
  type: 'boolean';
  name: string;
  defaultValue: boolean;
};

export type EditableNumberOption = {
  type: 'number';
  name: string;
  defaultValue: number;
};

export type EditableChoiceOption = {
  type: 'choice';
  name: string;
  values: string[];
  defaultValue: string;
};

export type EditableOption =
  | EditableBooleanOption
  | EditableNumberOption
  | EditableChoiceOption;
