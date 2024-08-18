import "@mantine/core/styles.css";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/layout/header";
import { Inter } from "next/font/google";
import { AppProps } from "next/app";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ ...theme, fontFamily: inter.style.fontFamily }}>
      <Head>
        <title>Movie Browsing</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <AppShell
        header={{
          height: 70,
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
