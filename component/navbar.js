import style from "../style/navbar.module.css";
import Link from "next/link";
export default function Navbar() {
  const burger = () => {
    const burger = document.getElementById("burger");
    const backgroundBlur = document.getElementById("backgroundBlur");
    const navSec = document.getElementById("navSec");
    const navWrap = document.getElementById("navWrap");
    burger.classList.toggle(style.toggle);
    backgroundBlur.classList.toggle(style["bb-toggle"]);
    navSec.classList.toggle(style["navSec-toggle"]);
    navWrap.classList.toggle(style["navWrap-toggle"]);
  };
  return (
    <>
      <div
        className={style["background-blur"]}
        id="backgroundBlur"
        onClick={burger}
      />
      <div className={style.burger} id="burger" onClick={burger}>
        <div className={style.line1} />
        <div className={style.line2} />
        <div className={style.line3} />
      </div>
      <nav className={style["navbar-sec"]} id="navSec">
        <div className={style["nav-wrapper"]} id="navWrap">
          <ul>
            <li>
              <Link onClick={burger} href="/">
                Home
              </Link>
            </li>
            <li>
              <a
                onClick={burger}
                href="https://blog.rahulahire.com"
                target="_blank"
                rel="noreferrer"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                onClick={burger}
                href="https://rahulahire.thinkific.com"
                target="_blank"
                rel="noreferrer"
              >
                DynamoDB Course
              </a>
            </li>
            <li>
              <Link onClick={burger} href="/dimension">
                Check Dimension
              </Link>
            </li>
            <li>
              <Link onClick={burger} href="/dynamodb-wrcu">
                RCU-WCU Calculator
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
