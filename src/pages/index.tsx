import Head from 'next/head';

import { InputArea, OptionDrawer, OutputArea } from '@/components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Prettier Playground</title>
        <meta
          name="description"
          content="Playground to get formatting results using a specific version of Prettier."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <OptionDrawer>
        <div className="flex h-full w-full p-6">
          <div className="-mt-2 flex-grow">
            <InputArea />
          </div>
          <div className="divider divider-horizontal" />
          <div className="-mt-2 flex-grow">
            <OutputArea />
          </div>
        </div>
      </OptionDrawer>
    </>
  );
}
