import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import type { ReactNode } from "react";
import "nextra-theme-docs/style.css";
import "./globals.css";

export const metadata = {
  title: "Документация Design Playground",
  description: "Документация внутренней дизайн-системы Gigonom"
};

const navbar = <Navbar logo={<strong>Gigonom UI</strong>} projectLink="https://github.com/mzhoff/design-playground" />;
const footer = <Footer>Gigonom Design Playground</Footer>;

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" dir="ltr" suppressHydrationWarning>
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/mzhoff/design-playground/tree/main/apps/docs"
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
