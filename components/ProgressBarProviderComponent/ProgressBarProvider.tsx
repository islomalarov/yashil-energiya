"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="5px"
        color="#12903e"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
