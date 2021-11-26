<script>
  import "../style/navbar.css";
  import { link } from "svelte-routing";

  const burger = () => {
    const burger = document.querySelector(".burger");
    const backgroundBlur = document.querySelector(".background-blur");
    const navSec = document.querySelector(".navbar-sec");
    const navWrap = document.querySelector(".nav-wrapper");
    burger.classList.toggle("toggle");
    backgroundBlur.classList.toggle("bb-toggle");
    navSec.classList.toggle("navSec-toggle");
    navWrap.classList.toggle("navWrap-toggle");
  };
</script>

<!-- <div class="navbar-container">
    <div class="background-blur">

    </div>
    <div class="button">

    </div>
    <nav class="navbar-sec">
        hi
        <Link to="/dimension">Dimension</Link>
    </nav>
</div> -->
<div class="background-blur" id="backgroundBlur" on:click={burger} />
<div class="burger" id="burger" on:click={burger}>
  <div class="line1" />
  <div class="line2" />
  <div class="line3" />
</div>
<nav class="navbar-sec">
  <div class="nav-wrapper">
    <ul>
      <li><a on:click={burger} href="/" use:link>Home</a></li>
      <li>
        <a on:click={burger} href="https://blog.rahulahire.com" target="_blank"
          >Blogs</a
        >
      </li>
      <li><a on:click={burger} href="https://rahulahire.thinkific.com" target="_blank" use:link>DynamoDB Course</a></li>
      <li>
        <a on:click={burger} href="/dimension" use:link>Check Dimension</a>
      </li>
      <li>
        <a on:click={burger} href="/dynamodb-wrcu" use:link
          >RCU-WCU Calculator</a
        >
      </li>
    </ul>
  </div>
</nav>
