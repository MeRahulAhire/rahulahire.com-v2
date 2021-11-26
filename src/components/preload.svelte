<script>
  import "../style/preload.css";
  
  window.addEventListener("load", () => {
    document.getElementById("preloader").style.display = "none";
    document.body.style.overflow = "visible";
  });
</script>

<div class="preloaders" id="preloader">
  <!-- Preloader Code Attribution : https://codepen.io/InfernalNephilim/pen/aRpgNB -->
  <div class="loader-wrapper loader-wrapper--3">
    <div class="loader loader--3">
      <div class="circle-line" />
      <div class="circle-line" />
      <div class="circle-line" />
      <div class="circle-line" />
      <div class="circle-line" />
    </div>
  </div>
</div>
