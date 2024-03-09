import Head from 'next/head';

import { OptionDrawer } from '@/components';

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
          <div className="card grid flex-grow place-items-center bg-base-300">
            content1
          </div>
          <div className="divider divider-horizontal" />
          <div className="flex-grow">
            <div className="flex h-full flex-col">
              <div className="card grid flex-grow place-items-center bg-base-300">
                content2
              </div>
              <div className="divider" />
              <div className="card grid flex-grow place-items-center bg-base-300">
                content3
              </div>
            </div>
          </div>
        </div>
      </OptionDrawer>
    </>
  );
}
