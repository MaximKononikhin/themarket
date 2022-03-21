import React from "react";

import Header from "blocks/add-item/header";

const Page = () => {
    return <div />;
};

Page.PageTemplate = ({ children }: { children: React.ReactNode }) => (
  <>
      <Header />
      {children}
  </>
);

export default Page;
