import { useEffect } from "react";

import style from "../style/preload.module.css";
export default function Preload() {
  useEffect(() => {
      window.addEventListener('load', ()=> {

          document.body.style.overflow = "visible";
          document.getElementById("preloader").classList.toggle(style.plHidden);
      })
  },[]);
  return (
    <div className={style["preloaders"]} id="preloader">
      {/* Preloader Code Attribution : https://codepen.io/InfernalNephilim/pen/aRpgNB */}
      <div
        className={`${style["loader-wrapper"]} ${style["loader-wrapper--3"]}`}
      >
        <div className={`${style.loader} ${style["loader--3"]}`}>
          <div className={style["circle-line"]} />
          <div className={style["circle-line"]} />
          <div className={style["circle-line"]} />
          <div className={style["circle-line"]} />
          <div className={style["circle-line"]} />
        </div>
      </div>
    </div>
  );
}
