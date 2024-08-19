import "@mantine/core/styles.css";
import Head from "next/head";
import { AppShell, Box, Container, MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { Inter } from "next/font/google";
import { AppProps } from "next/app";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { queryClientOptions } from "../utils/constants";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{ ...theme, fontFamily: inter.style.fontFamily }}
    >
      <Head>
        <title>Movie Browsing</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <AppShell
            header={{
              height: 70,
            }}
          >
            <AppShell.Header>
              <nav
                style={{ height: "100%", width: "100%" }}
                id="app__header"
              ></nav>
            </AppShell.Header>
            <AppShell.Main>
              <Container size={2000} mt="sm">
                <Component {...pageProps} />
              </Container>
            </AppShell.Main>
          </AppShell>
        </HydrationBoundary>
      </QueryClientProvider>
    </MantineProvider>
  );
}
