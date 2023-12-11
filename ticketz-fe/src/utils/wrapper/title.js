import Head from "next/head";

function Title({ title, children }) {
  return (
    <>
      <Head>
        <title>Tickitz - {title}</title>
      </Head>
      {children}
    </>
  );
}

export default Title;
