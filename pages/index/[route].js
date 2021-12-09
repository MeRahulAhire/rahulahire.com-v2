import axios from "axios";
import Tag from "../../component/tag";

export default function Route({ homeUrl }) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<script> window.location = "${homeUrl}"</script>`,
        }}
      />
      <Tag />
    </>
  );
}
export async function getServerSideProps(context) {
  const id = context.params.id;
  const baseUrl = `https://rahulahire.com/${id}`;
  console.log(id, baseUrl)
  return {
    props: {
      homeUrl: baseUrl,
    },
  };
}
