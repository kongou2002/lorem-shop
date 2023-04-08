import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextBreadcrumbs from "../components/BreadCrum/NextBreadcrumbs";
import Layout from "../layouts/LandingPages";
import { wrapper } from "../store/store";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <main className="container mx-auto max-h-full">
          <NextBreadcrumbs />
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}

export default wrapper.withRedux(App);
