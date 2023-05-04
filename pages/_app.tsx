import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import NextBreadcrumbs from "../components/BreadCrum/NextBreadcrumbs";
import Layout from "../layouts/Main";
import { wrapper } from "../store/store";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <>
      <NextBreadcrumbs />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
