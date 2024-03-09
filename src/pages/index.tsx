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
        <div>Prettier Playground</div>
      </OptionDrawer>
    </>
  );
}
