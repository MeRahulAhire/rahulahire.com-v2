import axios from "axios";

export default function Id({ blogPage }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: `${blogPage}`}}/>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const baseUrl = `https://blog.rahulahire.com/${id}`;
  // const lambdaUrl = `https://04o7ho1666.execute-api.ap-south-1.amazonaws.com/blog`
  const res = (await axios.get(baseUrl)).data;
  console.log(id)
  return {
    props: {
      blogPage: res,
    },
  };
}
