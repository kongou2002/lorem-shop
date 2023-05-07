import React, { useState } from "react";

import Header from "../../components/AppHeader";
import Footer from "../../components/AppFooter";
import prisma from "@/utils/prisma";
import { product } from "@prisma/client";

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
