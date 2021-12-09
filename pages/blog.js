import axios from "axios";
import Tag from "../component/tag";
export default function Id({ blogPage, blogUrl }) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blogPage} <script> window.location = "${blogUrl}"</script>`,
        }}
      />
      <Tag />
    </>
  );
}

export async function getServerSideProps(context) {
  const baseUrl = `https://blog.rahulahire.com/`;
  const res = (await axios.get(baseUrl)).data;
  return {
    props: {
      blogPage: res,
      blogUrl: baseUrl,
    },
  };
}
