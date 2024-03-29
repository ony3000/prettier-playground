import { useSetRecoilState } from 'recoil';

import { prettierOptionsAtom } from '@/shared-kernel/stores';

import type { EditableOption } from './types';

const editableOptions: EditableOption[] = [
  {
    type: 'choice',
    name: 'parser',
    values: ['babel', 'typescript', 'vue', 'html', 'astro'],
    defaultValue: 'babel',
  },
  {
    type: 'number',
    name: 'printWidth',
    defaultValue: 80,
  },
  {
    type: 'number',
    name: 'tabWidth',
    defaultValue: 2,
  },
  {
    type: 'boolean',
    name: 'useTabs',
    defaultValue: false,
  },
];

export function useOptionDrawer() {
  const setPrettierOptions = useSetRecoilState(prettierOptionsAtom);

  return {
    editableOptions,
    setPrettierOptions,
  };
}
