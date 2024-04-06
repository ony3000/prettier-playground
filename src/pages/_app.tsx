import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { classNames } from '@/adaptors';
import { pretendard } from '@/fonts';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <main className={classNames(pretendard.variable, 'font-sans')}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
