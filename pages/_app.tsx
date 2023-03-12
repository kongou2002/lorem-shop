import "@/styles/globals.css";
import Header from "@/components/AppHeader";
import type { AppProps } from "next/app";
import NextBreadcrumbs from "../components/BreadCrum/NextBreadcrumbs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <NextBreadcrumbs />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
