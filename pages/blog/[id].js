import axios from "axios";
import Tag from "../../component/tag";
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
  const id = context.params.id;
  const baseUrl = `https://blog.rahulahire.com/${id}`;
  const res = (await axios.get(baseUrl)).data;
  console.log(id);
  return {
    props: {
      blogPage: res,
      blogUrl: baseUrl,
    },
  };
}
