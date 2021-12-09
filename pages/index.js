import Tag from "../component/tag";
import axios from "axios";
export default function index({ homePage, homeUrl }) {
  return (
    <>
      <div className={{display:'none',}}
        dangerouslySetInnerHTML={{
          __html: `${homePage} <script>window.location="${homeUrl}"</script>`,
        }}
      />
      <Tag/>
    </>
  );
}
export async function getServerSideProps() {
  const baseUrl = `https://rahulahire.com`;
  const res = (await axios.get(baseUrl)).data;
  return {
    props: {
      homePage: res,
      homeUrl: baseUrl,
    },
  };
}