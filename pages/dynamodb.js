import React,{useEffect} from "react";
import Head from "next/head";
export default function Dynamodb() {
    useEffect(()=> {
        window.location = '/the-ultimate-dynamodb-course'
    })
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Ultimate DynamoDB Course</title>
        <meta name="theme-color" content="#212121" />
        <link rel="canonical" href="https://rahul.com" />
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
          content="./assets/img/tudc cover image 1080p.png"
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
          content="./assets/img/tudc cover image 1080p.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Rahul Ahire" />
      </Head>
    </div>
  );
}
