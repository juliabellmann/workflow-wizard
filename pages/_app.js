import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import Head from "next/head";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Done - Workflow Wizard</title>
      </Head>
      <GlobalStyle />
      <RootLayout>
        <SWRConfig
          value={{
            fetcher: async (...args) => {
              const response = await fetch(...args);
              if (!response.ok) {
                throw new Error(`Request with ${JSON.stringify(args)} failed.`);
              }
              return await response.json();
            },
          }}
        >
          <Component {...pageProps}></Component>
        </SWRConfig>
      </RootLayout>
    </>
  );
}
