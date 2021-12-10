import React,{useEffect} from "react";
import Head from "next/head";
import Tag from "../component/tag";
export default function Dynamodb() {
    useEffect(()=> {
        window.location = 'https://rahulahire.thinkific.com/courses/the-ultimate-dynamodb-course'
    })
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Ultimate DynamoDB Course</title>
        <meta name="theme-color" content="#212121" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="The only practical and purpose driven DynamoDB Course covered with all the aspects that you need to master DynamoDB"
        />
        <meta name="title" content="The Ultimate DynamoDB Course" />

        <meta
          property="og:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/tudc+cover+image+1080p.png"
        />
        <meta property="og:title" content="The Ultimate DynamoDB Course" />
        <meta
          property="og:description"
          content="The only practical and purpose driven DynamoDB Course covered with all the aspects that you need to master DynamoDB"
        />
        <meta property="og:url" content="https://rahulahire.com" />
        <meta property="og:site_name" content="Rahul Ahire" />

        <meta name="twitter:title" content="The Ultimate DynamoDB Course" />
        <meta
          name="twitter:description"
          content="The only practical and purpose driven DynamoDB Course covered with all the aspects that you need to master DynamoDB"
        />
        <meta
          name="twitter:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/tudc+cover+image+1080p.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Rahul Ahire" />
      </Head>
      <Tag/>
    </div>
  );
}
