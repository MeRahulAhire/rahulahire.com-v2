import { useEffect } from "react";
import style from "../style/dimension.module.css";

function Dimension() {
  useEffect(() => {
    document.getElementById("height").innerHTML = window.innerHeight;
    document.getElementById("width").innerHTML = window.innerWidth;
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      document.getElementById("height").innerHTML = window.innerHeight;
      document.getElementById("width").innerHTML = window.innerWidth;
    });
  });
  return (
    <div className={style["dimension-div"]}>
      <div className={style["height"]}>
        <div className={style["height-span"]} />
        <h3>
          Height : <span id="height" />
          px
        </h3>
      </div>
      <div className={style["width"]}>
        <h3>
          Width : <span id="width" />
          px
        </h3>
        <div className={style["width-span"]} />
      </div>
    </div>
  );
}

export default Dimension;
