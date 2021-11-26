import React from "react";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
function Gtm() {
  const gtmParams = { id: "GTM-NZN5LVK" };
  return (
    <React.Fragment>
      <GTMProvider state={gtmParams} />
    </React.Fragment>
  );
}

export default Gtm;
