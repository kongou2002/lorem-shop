import React from "react";

import Header from "../../components/AppHeader";
import Footer from "../../components/AppFooter";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
