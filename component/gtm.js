import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
function Gtm() {
  const gtmParams = { id: "GTM-NZN5LVK" };
  return (
    <>
      <GTMProvider state={gtmParams} />
    </>
  );
}

export default Gtm;
