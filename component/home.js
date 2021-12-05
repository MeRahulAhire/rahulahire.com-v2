import React, { useEffect } from "react";
import Head from "next/head";
import style from "../style/home.module.css";
import Container from "./container";
export default function Home() {
  useEffect(() => {
    document.getElementById("vid1").play();
  }, []);
  let isSec2Scrolled = false;
  let isSec3Scrolled = false;
  let isSec4Scrolled = false;
  let isSec5Scrolled = false;
  useEffect(() => {
      let a = 1
      console.log(a++)
      a++
      window.addEventListener("scroll", () => {
        const scrollPosition = (window.scrollY / window.innerHeight) * 100;
        const vid2 = document.getElementById("vid2");
        const vid3 = document.getElementById("vid3");
        const vid4 = document.getElementById("vid4");
        const vid5 = document.getElementById("vid5");
    
        if (scrollPosition > 69 && !isSec2Scrolled) {
          vid2.play();
          isSec2Scrolled = true;
        }
        if (scrollPosition > 169 && !isSec3Scrolled) {
          vid3.play();
          isSec3Scrolled = true;
        }
        if (scrollPosition > 269 && !isSec4Scrolled) {
          vid4.play();
          isSec4Scrolled = true;
        }
        if (scrollPosition > 369 && !isSec5Scrolled) {
          vid5.play();
          isSec5Scrolled = true;
        }
      });
  })
  return (
    <>
    <Container/>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://s3.ap-south-1.amazonaws.com/rahulahire.com/blackhole.ico"
        />
        <meta name="theme-color" content="#0f0f0f" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="I'm mostly a self Taught Person. I have diverse interest in Tech, Programming, Human nature and how the world operates. Professionally, I know Fullstack Javascript and AWS serverless."
        />

        <meta name="title" content="Hi, I'm Rahul Ahire" />
        <meta
          name="keywords"
          content="Rahul Ahire, MeRahulAhire, Rahul Ahire FB"
        />
        <meta
          property="og:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/black-hole.jpg"
        />
        <meta property="og:title" content="Hi, I'm Rahul Ahire" />
        <meta
          property="og:description"
          content="I'm mostly a self Taught Person. I have diverse interest in Tech, Programming, Human nature and how the world operates. Professionally, I know Fullstack Javascript and AWS serverless."
        />
        <meta property="og:url" content="https://rahulahire.com" />
        <meta property="og:site_name" content="Rahul Ahire" />

        <meta name="twitter:title" content="Hi, I'm Rahul Ahire" />
        <meta
          name="twitter:description"
          content="I'm mostly a self Taught Person. I have diverse interest in Tech, Programming, Human nature and how the world operates. Professionally, I know Fullstack Javascript and AWS serverless."
        />
        <meta
          name="twitter:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/black-hole.jpg"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image:alt" content="Rahul Ahire - Alt" />
        <title>Hi, I'm Rahul Ahire</title>
      </Head>
      <section className={style["sec-container"]}>
        <div className={`${style.sidedrawer} ${style["sd-sec1"]}`}>
          <div className={style["sd-wrapper"]}>
            <h1>Hi, I'm Rahul Ahire</h1>
            <p>
              I'm mostly a self Taught Person. I have diverse interest in Tech,
              Programming, Human nature and how the world operates.
              Professionally, I know Fullstack Javascript and AWS serverless.
            </p>
          </div>
        </div>
        <div className={style["vid-container"]}>
          <video
            src="./assets/sec1-halftone.mp4"
            muted
            id="vid1"
            className={style.video}
            // autoPlay
          ></video>
          <div className={style["vid1-dimmer"]} />
        </div>
        <div className={`${style["mob-drawer"]} ${style["sd-sec1"]}`}>
          <div className={`${style["sd-wrapper"]} ${style["sd-mobi"]}`}>
            <h1>Hi, I'm Rahul Ahire</h1>
            <p>
              I'm mostly a self Taught Person. I have diverse interest in Tech,
              Programming, Human nature and how the world operates.
              Professionally, I know Fullstack Javascript and AWS serverless.
            </p>
          </div>
        </div>
      </section>

      <section className={style["sec-container"]}>
        <div className={`${style.sidedrawer} ${style["sd-sec2"]}`}>
            <div className={style.sdbg}>

          <div className={style["sd-wrapper"]}>
            <h3>Pune, the City where I live</h3>
            <p>
              Be it Gandhi, Britishers or Shri Chhatrapati Shivaji Maharaj, Pune
              was an important administrative area for these mens. Pune has its
              own rich cultural history.{" "}
              <a href="https://en.wikipedia.org/wiki/Pune">Know more</a>.
            </p>
          </div>
            </div>
        </div>
        <div className={style["vid-container"]}>
          <video
            src="./assets/pune-3d-view.mp4"
            muted
            id="vid2"
            className={style.video}
          ></video>
        </div>
        <div className={`${style["mob-drawer"]} ${style["sd-sec2"]}`}>
            <div className={style.sdbg}>

          <div className={`${style["sd-wrapper"]} ${style["sd-mobi"]}`}>
            <h3>Pune, the City where I live</h3>
            <p>
              Be it Gandhi, Britishers or Shri Chhatrapati Shivaji Maharaj, Pune
              was an important administrative area for these mens. Pune has its
              own rich cultural history.{" "}
              <a
                href="https://en.wikipedia.org/wiki/Pune"
                target="_blank"
                rel="noreferrer"
              >
                Know more
              </a>
            </p>
          </div>
            </div>
        </div>
      </section>

      <section className={style["sec-container"]}>
        <div className={`${style.sidedrawer} ${style["sd-sec3"]}`}>
          <div className={style["sd-wrapper"]}>
            <h3 className="">Shirur...</h3>
            <p>
              Although, I live in Pune but I was born, raised and lived first 16
              years of my life in this town.
            </p>
          </div>
        </div>
        <div className={style["vid-container"]}>
          <video
            src="./assets/pune-to-shirur.mp4"
            muted
            id="vid3"
            className={style.video}
          ></video>
        </div>
        <div className={`${style["mob-drawer"]} ${style["sd-sec3"]}`}>
          <div className={`${style["sd-wrapper"]} ${style["sd-mobi"]}`}>
            <h3 className="">Shirur...</h3>
            <p>
              Although, I live in Pune but I was born, raised and lived first 16
              years of my life in this town.
            </p>
          </div>
        </div>
      </section>

      <section className={style["sec-container"]}>
        <div className={`${style.sidedrawer}  ${style["sd-4"]}`}>
          <div className={style["sd-wrapper"]}>
            <p>
              Ever since my childhood I've always been facinated with all shows
              like Cosmos, Curiosity, Into the wormhole with Morgan Freeman,etc.
              Questioning on the mechanics of the Universe has always kinda felt
              spiritual to me. Although I've no in-depth Knowledge on
              Astrophysics, This is definitely something I'll be looking forward
              in future.
            </p>
          </div>
        </div>
        <div className={style["vid-container"]}>
          <video
            src="./assets/my-facination.mp4"
            muted
            id="vid4"
            className={style.video}
          ></video>
        </div>
        <div className={`${style["mob-drawer"]} ${style["sd-4"]}`}>
          <div className={`${style["sd-wrapper"]} ${style["sd-mobi"]}`}>
            <p>
              Ever since my childhood I've always been facinated with all shows
              like Cosmos, Curiosity, Into the wormhole with Morgan Freeman,etc.
              Questioning on the mechanics of the Universe has always kinda felt
              spiritual to me. Although I've no in-depth Knowledge on
              Astrophysics, This is definitely something I'll be looking forward
              in future.
            </p>
          </div>
        </div>
      </section>
      <section className={style["sec-container"]}>
        <div className={`${style.sidedrawer}  ${style["sd-5"]}`}>
          <div className={style["sd-wrapper"]}>
            <p>
              As I had interest in Space science I decided to study for JEE
              after my 10th grade. Little did I knew how f'd I would be in that
              process. Amidst all of the chaos, in 2017 I discovered Elon Musk
              on YouTube and got the first handhold experience of capitalism and
              what Entrepreneurship can do for the society. And, that opened my
              eyes for various possibilities.
            </p>
          </div>
        </div>
        <div className={style["vid-container"]}>
          <video
            src="./assets/elon-musk.mp4"
            muted
            id="vid5"
            className={style.video}
          ></video>
        </div>
        <div className={`${style["mob-drawer"]} ${style["sd-5"]}`}>
          <div className={`${style["sd-wrapper"]} ${style["sd-mobi"]}`}>
            <p>
              As I had interest in Space science I decided to study for JEE
              after my 10th grade. Little did I knew how f'd I would be in that
              process. Amidst all of the chaos, in 2017 I discovered Elon Musk
              on YouTube and got the first handhold experience of capitalism and
              what Entrepreneurship can do for the society. And, that opened my
              eyes for various possibilities.
            </p>
          </div>
        </div>
      </section>
      <section className={style["pink-wrap"]}>
        <div className={style["pink-grid"]}>
          <h3>My Future Plans</h3>
        </div>
      </section>
      <section className={style.future}>
        <div className={style["future-wrap"]}>
          <p>
            Since 2018, I've got to learn on various things and taking those
            inspiration, Within next 10 years I want to expand in these three
            area.
          </p>
          <ol>
            <li>
              Simplified P2P file sharing and efficient media collaboration
              platform for Tech companies and Content Creator. Details regarding
              this will be updated later.
            </li>
            <li>
              Data is the new oil. Just like how FB, Google use your private
              data to serve you personalised ads, I think using the same data
              and doing a proper analysis over it taking consider of human
              motivation can be used to improve and automate our life since
              everything that we do has a digital footprint.
            </li>
            <li>
              I've been utterly mesmerised by how Elon Musk and his team at
              Neuralink has achieved the feat in Brain Computer Interface in
              just 3-4 years that whole medical industry hasn't been able to
              figure out in last 3 decades. Also taking inspiration from
              business model of{" "}
              <a
                href="https://www.youtube.com/c/LinusTechTips"
                target="_blank"
                title="Linus Tech Tips"
                rel="noreferrer"
              >
                Linus Tech Tips
              </a>
              , I have lots of question around Astrophysics to which I want to
              solve by creating a edu-media research organisation and connect
              ancient knowledge with modern age science which we are
              disconnected. I find there's immense value for society to regain
              new awarness from it.
            </li>
          </ol>
        </div>
      </section>
      <footer className={style.footer}>
        <div className={style["footer-wrap"]}>
          <div className={style.email}>
            If you got some Ideas, Feedback or suggestion, Please send it my way{" "}
            <a href="mailto:info@rahulahire.com">info@RahulAhire.com</a>
          </div>
          <div className={style["social-links"]}>
            <div className={`${style.links} ${style.l1}`}>
              <a
                href="https://twitter.com/MeRahulAhire"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/twitter.svg"
                  alt="logo"
                />{" "}
                Twitter
              </a>
            </div>
            <div className="links l2">
              <a
                href="https://linkedIn.com/in/MeRahulAhire"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/linkedin.svg"
                  alt="logo"
                />{" "}
                LinkedIn
              </a>
            </div>
            <div className="links l3">
              <a
                href="https://GitHub.com/MeRahulAhire"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/github.svg"
                  alt="logo"
                />{" "}
                Github
              </a>
            </div>
            <div className="links l4">
              <a
                href="https://Instagram.com/MeRahulAhire"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/instagram.svg"
                  alt="logo"
                />{" "}
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
