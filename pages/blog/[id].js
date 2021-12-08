import axios from "axios";
import Tag from "../../component/tag";
export default function Id({ blogPage }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: `${blogPage}`}}/>
      <Tag />
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const baseUrl = `https://blog.rahulahire.com/${id}`;
  const res = (await axios.get(baseUrl)).data;
  return {
    props: {
      blogPage: res,
    },
  };
}
