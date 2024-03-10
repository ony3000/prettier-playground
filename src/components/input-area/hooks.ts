import { useSetRecoilState } from 'recoil';

import { plainTextAtom } from '@/shared-kernel/stores';

export function useInputArea() {
  const setPlainText = useSetRecoilState(plainTextAtom);

  return {
    setPlainText,
  };
}
