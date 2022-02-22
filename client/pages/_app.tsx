import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

import PageTemplate from "blocks/page-template";
import ModalProvider from "components/modal-provider";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    
    * {
      box-sizing: border-box;
      font-family: "Ramy", Helvetica, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";

    }
  }
`;

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any> & {
    PageTemplate: React.ElementType;
  };
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const PageWrapper = Component.PageTemplate || PageTemplate;

  return (
    <PageWrapper>
      <GlobalStyle />
      <div id="content">
        <Component {...pageProps} />
      </div>
      <ModalProvider />
    </PageWrapper>
  );
}

export default MyApp;
