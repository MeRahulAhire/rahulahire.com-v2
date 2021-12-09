import axios from "axios";
import Tag from "../component/tag";

export default function Route({ homePage, homeUrl }) {
    return (
        <>
        <div
        dangerouslySetInnerHTML={{
          __html: `${homePage} <script> window.location = "${homeUrl}"</script>`,
        }}
      />
      <Tag/>
        </>
    )
}
export async function getServerSideProps(context) {
    const id = context.params.id;
    const baseUrl = `https://rahulahire.com/${id}`;
    const res = (await axios.get(baseUrl)).data;
    console.log(id);
    return {
      props: {
        homePage: res,
        homeUrl: baseUrl,
      },
    };
  }
  