import React from "react";

import "../style/preload.css";
export default function Preload() {
  window.addEventListener("load", () => {
    document.getElementById("preloader").style.display = "none";
    document.body.style.overflow = "visible";
  });
  return (
    <div className="preloaders" id="preloader">
      {/* Preloader Code Attribution : https://codepen.io/InfernalNephilim/pen/aRpgNB */}
      <div className="loader-wrapper loader-wrapper--3">
        <div className="loader loader--3">
          <div className="circle-line" />
          <div className="circle-line" />
          <div className="circle-line" />
          <div className="circle-line" />
          <div className="circle-line" />
        </div>
      </div>
    </div>
  );
}
