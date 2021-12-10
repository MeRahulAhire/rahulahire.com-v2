import axios from "axios";
import Tag from "../../component/tag";
export default function Id({ blogPage, blogUrl }) {
  return (
    <>
    
    <h1>Please wait you are being redirected to the blog...</h1>
      <div style={{display:'none'}}
        dangerouslySetInnerHTML={{
          __html: `${blogPage} <script>setTimeout(()=> {window.location = "${blogUrl}"}, 1000)</script>`,
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
