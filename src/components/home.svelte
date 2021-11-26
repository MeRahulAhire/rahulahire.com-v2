<script>
  let isSec2Scrolled = false;
  let isSec3Scrolled = false;
  let isSec4Scrolled = false;
  let isSec5Scrolled = false;
  window.addEventListener("load", () => {
    document.getElementById("vid1").play();
  });
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
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Lato:wght@300;400&family=Lobster+Two&family=Open+Sans:wght@400;500&family=Righteous&family=Shippori+Antique+B1&display=swap"
    rel="stylesheet"
  />
  <title>Hi, I'm Rahul Ahire</title>
  <link
    rel="icon"
    type="image/x-icon"
    href="https://s3.ap-south-1.amazonaws.com/rahulahire.com/blackhole.ico"
  />
</svelte:head>

<section class="sec-container">
  <div class="sidedrawer sd-sec1">
    <div class="sd-wrapper ">
      <h1>Hi, I'm Rahul Ahire</h1>
      <p>
        I'm mostly a self Taught Person. I have diverse interest in Tech,
        Programming, Human nature and how the world operates. Professionally, I
        know Fullstack Javascript and AWS serverless.
      </p>
    </div>
  </div>
  <div class="vid-container">
    <video src="./assets/sec1-halftone.mp4" muted id="vid1" class="video"
      ><track kind="captions" /></video
    >
    <div class="vid1-dimmer" />
  </div>
  <div class="mob-drawer sd-sec1">
    <div class="sd-wrapper sd-mobi">
      <h1>Hi, I'm Rahul Ahire</h1>
      <p>
        I'm mostly a self Taught Person. I have diverse interest in Tech,
        Programming, Human nature and how the world operates. Professionally, I
        know Fullstack Javascript and AWS serverless.
      </p>
    </div>
  </div>
</section>

<section class="sec-container">
  <div class="sidedrawer sd-sec2">
    <div class="sd-wrapper ">
      <h3>Pune, the City where I live</h3>
      <p>
        Be it Gandhi, Britishers or Shri Chhatrapati Shivaji Maharaj, Pune was
        an important administrative area for these mens. Pune has its own rich
        cultural history. <a href="https://en.wikipedia.org/wiki/Pune"
          >Know more</a
        >.
      </p>
    </div>
  </div>
  <div class="vid-container">
    <video src="./assets/pune-3d-view.mp4" muted id="vid2" class="video"
      ><track kind="captions" /></video
    >
  </div>
  <div class="mob-drawer sd-sec2">
    <div class="sd-wrapper sd-mobi">
      <h3>Pune, the City where I live</h3>
      <p>
        Be it Gandhi, Britishers or Shri Chhatrapati Shivaji Maharaj, Pune was
        an important administrative area for these mens. Pune has its own rich
        cultural history. <a
          href="https://en.wikipedia.org/wiki/Pune"
          target="_blank">Know more</a
        >.
      </p>
    </div>
  </div>
</section>

<section class="sec-container">
  <div class="sidedrawer sd-sec3">
    <div class="sd-wrapper ">
      <h3 class="">Shirur...</h3>
      <p>
        Although, I live in Pune but I was born, raised and lived first 16 years
        of my life in this town.
      </p>
    </div>
  </div>
  <div class="vid-container">
    <video src="./assets/pune-to-shirur.mp4" muted id="vid3" class="video"
      ><track kind="captions" /></video
    >
  </div>
  <div class="mob-drawer sd-sec3">
    <div class="sd-wrapper sd-mobi">
      <h3 class="">Shirur...</h3>
      <p>
        Although, I live in Pune but I was born, raised and lived first 16 years
        of my life in this town.
      </p>
    </div>
  </div>
</section>

<section class="sec-container">
  <div class="sidedrawer sd-sec3 sd-4">
    <div class="sd-wrapper ">
      <p>
        Ever since my childhood I've always been facinated with all shows like Cosmos, Curiosity, Into the wormhole with Morgan
        Freeman,etc. Questioning on the mechanics of the Universe has always
        kinda felt spiritual to me. Although I've no in-depth Knowledge on
        Astrophysics, This is definitely something I'll be looking forward in
        future.
      </p>
    </div>
  </div>
  <div class="vid-container">
    <video src="./assets/my-facination.mp4" muted id="vid4" class="video"
      ><track kind="captions" /></video
    >
  </div>
  <div class="mob-drawer sd-sec3 sd-4">
    <div class="sd-wrapper sd-mobi">
      <p>
        Ever since my childhood I've always been facinated with all shows like Cosmos, Curiosity, Into the wormhole with Morgan
        Freeman,etc. Questioning on the mechanics of the Universe has always
        kinda felt spiritual to me. Although I've no in-depth Knowledge on
        Astrophysics, This is definitely something I'll be looking forward in
        future.
      </p>
    </div>
  </div>
</section>
<section class="sec-container">
  <div class="sidedrawer sd-sec3 sd-5">
    <div class="sd-wrapper ">
      <p>
        As I had interest in Space science I decided to study for JEE after my
        10th grade. Little did I knew how f'd I would be in that process. Amidst all of the
        chaos, in 2017 I discovered Elon Musk on YouTube and got the first handhold
        experience of capitalism and what Entrepreneurship can do for the
        society. And, that opened my eyes for various possibilities.
      </p>
    </div>
  </div>
  <div class="vid-container">
    <video src="./assets/elon-musk.mp4" muted id="vid5" class="video"
      ><track kind="captions" /></video
    >
  </div>
  <div class="mob-drawer sd-sec3 sd-5">
    <div class="sd-wrapper sd-mobi">
      <p>
        As I had interest in Space science I decided to study for JEE after my
        10th grade. Little did I knew how f'd I would be in that process. Amidst all of the
        chaos, in 2017 I discovered Elon Musk on YouTube and got the first handhold
        experience of capitalism and what Entrepreneurship can do for the
        society. And, that opened my eyes for various possibilities.
      </p>
    </div>
  </div>
</section>
<section class="pink-wrap">
  <div class="pink-grid">
    <h3>My Future Plans</h3>
  </div>
</section>
<section class="future">
  <div class="future-wrap">
    <p>Since 2018, I've got to learn on various things and taking those inspiration, Within next 10 years I want to expand in these three area.</p>
    <ol>
      <li>Simplified P2P file sharing and efficient media collaboration platform for Tech companies and Content Creator. Details regarding this will be updated later.</li>
      <li>Data is the new oil. Just like how FB, Google use your private data to serve you personalised ads, I think using the same data and doing a proper analysis over it taking consider of human motivation can be used to improve and automate our life since everything that we do has a digital footprint.</li>
      <li>I've been utterly mesmerised by how Elon Musk and his team at Neuralink has achieved the feat in Brain Computer Interface in just 3-4 years that whole medical industry hasn't been able to figure out in last 3 decades. Also taking inspiration from business model of <a href="https://www.youtube.com/c/LinusTechTips" target="_blank" title="Linus Tech Tips">Linus Tech Tips</a>, I have lots of question around Astrophysics to which I want to solve by creating a edu-media research organisation and connect ancient knowledge with modern age science which we are disconnected. I find there's immense value for society to regain new awarness from it.</li>
    </ol>
  </div>
</section>
<footer>
  <div class="footer-wrap">
    <div class="email">
      If you got some Ideas, Feedback or suggestion, Please send it my way <a href="mailto:info@rahulahire.com">info@RahulAhire.com</a>
    </div>
    <div class="social-links">
      <div class="links l1">
        <a href="https://twitter.com/MeRahulAhire" target="_blank">
        
          <img src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/twitter.svg" alt="logo"> Twitter
        </a>
      </div>
      <div class="links l2">
        <a href="https://linkedIn.com/in/MeRahulAhire" target="_blank">
        
        
          <img src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/linkedin.svg" alt="logo"> LinkedIn
        </a>
      </div>
      <div class="links l3">
        <a href="https://GitHub.com/MeRahulAhire" target="_blank">
        
          <img src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/github.svg" alt="logo"> Github
        </a>
      </div>
      <div class="links l4">
        <a href="https://Instagram.com/MeRahulAhire" target="_blank">
        
          <img src="https://s3.ap-south-1.amazonaws.com/rahulahire.com/instagram.svg" alt="logo"> Instagram
        </a>
      </div>
      
    </div>
  </div>
</footer>

<style>
  .sidedrawer {
    grid-area: a;
    display: grid;
    place-items: center;
  }
  .sd-sec1 {
    background-image: url("https://s3.ap-south-1.amazonaws.com/rahulahire.com/white-wall-texture.jpg");
  }
  .sd-wrapper {
    width: 95%;
    text-align: left;
    margin-left: 16px;
    margin-right: 16px;
  }
  .sd-wrapper h1 {
    font-family: "Architects Daughter";
    font-size: 2rem;
  }
  .sd-wrapper p {
    font-family: "Open Sans", sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
  }
  .vid-container {
    grid-area: b;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .video {
    position: absolute;
    width: auto;
    height: auto;
    min-height: 100%;
    min-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .vid1-dimmer {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 239, 246, 0.25);
    position: absolute;
  }
  .mob-drawer {
    grid-area: c;
    display: grid;
    place-items: center;
    display: none;
  }
  .sd-mobi {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  .sec-container {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-template-rows: 6fr 4fr;
    grid-template-areas:
      "a b"
      "a b";
  }
  .sd-sec2 {
    background-color: #0f0f0f;
    color: #f7f7f7;
  }
  .sd-sec2 h3 {
    font-family: "Righteous";
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  .sd-sec2 a {
    color: white;
  }
  #vid3 {
    zoom: 0.1;
  }
  .sd-sec3 {
    background-color: #0f0f0f;
    color: #f7f7f7;
  }
  .sd-sec3 h3 {
    font-family: "Righteous";
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  #vid4 {
    zoom: 0.1;
  }
  .sd-4 {
    background-color: #fadfb3;
    color: #0f0f0f;
  }
  .sd-5 {
    background-color: #454c6e;
    color: #f7f7f7;
  }
  .pink-wrap {
    height: 300px;
    width: 100%;
    background-image: url("https://s3.ap-south-1.amazonaws.com/rahulahire.com/pink-paint-brush-bg.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #0f0f0f;
    display: grid;
    place-items: center;
  }
  .pink-wrap h3 {
    font-family: "Lobster Two", cursive;
    font-size: 3rem;
    text-align: center;
  }
  .future{
    min-height: 500px;
    max-height: auto;
    width: 100%;
    background: linear-gradient(135deg, #0177D9, #1F3FAB);
    display: grid;
    place-items: center;
  }
  .future-wrap{
    margin-left: 1rem;
    margin-right: 1rem;
    max-width: 1000px;
  }
  .future p{
    color: white;
    font-size: 1.25rem;
    font-family: 'Righteous';
    text-align: center;
  }
  .future li{
    font-family: "Open Sans", sans-serif;
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
    margin-top: 10px;
    font-size: 1rem;
  }
  .future a{
    color: white;
  }
  footer{
    background: #0f0f0f;
    height: 400px;
    width: 100;
    display: flex;
    align-items: center;
    justify-content: left;

  }
  .footer-wrap{
    color: #f7f7f7;
    font-family: 'Open Sans';
    font-size: 1rem;
    max-width: 500px;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .email{
    font-size: 1.5rem;
  }
  .email a{
    color: #39FF14;
    
  
  }
  .social-links{
    width: 250px;
    display: flex;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2fr);
    grid-template-rows: repeat(2fr);
    grid-gap: 10px

  }
  .social-links a{
    color: #f7f7f7;
    text-decoration: none;
  }
  .l1{
    grid-area: l1;
  }
  .links img{
    margin-right: 5px;
  }

  footer  img{
    height: 16px;
  }
  @media screen and (max-width: 550px) {
    .sec-container {
      grid-template-areas:
        "b b"
        "c c";
    }
    .sidedrawer {
      display: none;
    }
    .mob-drawer {
      display: grid;
    }
    .video {
      zoom: 0.5;
    }
    .future{
    height: 900px;
  }
  }
  @media screen and (max-height: 550px) {
    .sec-container {
      grid-template-columns: 4fr 6fr;
    }
    .video {
      zoom: 0.5;
    }
    .sd-wrapper h1 {
      font-family: "Architects Daughter";
      font-size: 1.9rem;
    }
    .sd-sec2 h3 {
      font-family: "Righteous";
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
  }
</style>
