import Head from "next/head";
import { useEffect } from "react";
import style from '../style/tudc.module.css'
import Image from "next/image";
import Container from '../component/container'
import Plyr from 'react-plyr';
export default function Tudc() {
  const buyCourse =() => {
    window.open("https://rahulahire.thinkific.com/");
  }
  useEffect(()=> {
    window.location = 'https://rahulahire.thinkific.com/courses/the-ultimate-dynamodb-course'
})
  const player = new Plyr('#player');
  return (
    <div style={{display: 'none',}}>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.9/plyr.css" />
        <title>The Ultimate DynamoDB Course</title>
        <link rel="shortcut icon" href="https://s3.ap-south-1.amazonaws.com/rahulahire.com/server+image300x300.jpg" type="image/x-icon" />
        <meta name="theme-color" content="#0f0f0f" />
        <link href="https://fonts.googleapis.com/css2?family=Alata&family=Architects+Daughter&family=Lobster&family=Open+Sans:wght@300;400;500&family=Righteous&display=swap" rel="stylesheet"/>
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
      <Container/>
      <section className={style.sec1}>
          <div className={style.bgCover}>
              <div className={style.sec1container}>
                <div className={style.head}>
                  The Ultimate <br /> DynamoDB Course
                  <p>The most Intuitive and Practical way to learn DynamoDB</p>
                  <div className={style.headbutton}>
                    <button onClick={buyCourse} className={style.buyNow}>Learn More</button>
                  </div>
                </div>
                <div className={style.sec1Image}>
                  <Image  width={400} height={400} src='/assets/img/database.svg'/>
                </div>
              </div>
          </div>
      </section>
      <section className={style.vidSec}>
        <div className={style.vidContainer}>
          <div className={style.vidText}>
            Why get this Course?
          </div>
        <Plyr
      type="vimeo" // or "vimeo"
      videoId="652938797"
    />
        </div>

      </section>

    </div>
  );
}
