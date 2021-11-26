import {useEffect} from "react";
import "../style/dimension.css";

function Dimension() {
  useEffect(() => {
    
    document.getElementById("height").innerHTML = window.innerHeight;
    document.getElementById("width").innerHTML = window.innerWidth;
  }, []);
  window.addEventListener("resize", () => {
    document.getElementById("height").innerHTML = window.innerHeight;
    document.getElementById("width").innerHTML = window.innerWidth;
  });
  return (
    <div className="dimension-div">
      <div className="height">
        <div className="height-span" />
        <h3>
          Height : <span id="height" />
          px
        </h3>
      </div>
      <div className="width">
        <h3>
          Width : <span id="width" />
          px
        </h3>
        <div className="width-span" />
      </div>
    </div>
  );
}

export default Dimension;
