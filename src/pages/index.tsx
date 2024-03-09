import Head from 'next/head';

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
      <div
        className="flex min-h-screen flex-col gap-8 px-5 py-8 sm:gap-16 sm:px-12
          sm:py-16 lg:gap-24 lg:px-20 lg:py-24"
      >
        Prettier Playground
      </div>
    </>
  );
}
