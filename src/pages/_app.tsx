import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { classNames } from '@/adaptors';
import { pretendard } from '@/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main className={classNames(pretendard.variable, 'font-sans')}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}
