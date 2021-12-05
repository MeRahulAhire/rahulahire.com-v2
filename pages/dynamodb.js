import {useEffect} from "react";
import Head from "next/head";
export default function dynamodb() {
    useEffect(()=> {
        window.location = '/the-ultimate-dynamodb-course'
    })
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/server+image300x300.jpg"
        />
        <meta property="og:title" content="The Ultimate DynamoDB Course" />
        <meta
          property="og:description"
          content="The only practical and purpose driven DynamoDB Course covered with all the aspects that you need to master DynamoDB"
        />
        <meta property="og:url" content="https://rahulahire.com/dynamodb" />
        <meta property="og:site_name" content="Rahul Ahire" />

        <meta name="twitter:title" content="The Ultimate DynamoDB Course" />
        <meta
          name="twitter:description"
          content="The only practical and purpose driven DynamoDB Course covered with all the aspects that you need to master DynamoDB"
        />
        <meta
          name="twitter:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/server+image300x300.jpg"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image:alt" content="Rahul Ahire" />
      </Head>
    </div>
  );
}
