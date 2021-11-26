import React from "react";
import "../style/navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
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
  return (
    <>
      <div className="background-blur" id="backgroundBlur" onClick={burger} />
      <div className="burger" id="burger" onClick={burger}>
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>
      <nav className="navbar-sec">
        <div className="nav-wrapper">
          <ul>
            <li>
              <Link onClick={burger} to="/">
                Home
              </Link>
            </li>
            <li>
              <a
                onClick={burger}
                href="https://blog.rahulahire.com"
                target="_blank"
                rel='noreferrer'
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                onClick={burger}
                href="https://rahulahire.thinkific.com"
                target="_blank"
                rel='noreferrer'
              >
                DynamoDB Course
              </a>
            </li>
            <li>
              <Link onClick={burger} to="/dimension">
                Check Dimension
              </Link>
            </li>
            <li>
              <a onClick={burger} href="/dynamodb-wrcu">
                RCU-WCU Calculator
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
