<script>
  import "../style/dimension.css";
  import { onMount } from "svelte";

  onMount(() => {
    document.getElementById("height").innerHTML = window.innerHeight;
    document.getElementById("width").innerHTML = window.innerWidth;
  });

  window.addEventListener("resize", () => {
    document.getElementById("height").innerHTML = window.innerHeight;
    document.getElementById("width").innerHTML = window.innerWidth;
  });
</script>

<div class="dimension-div">
  <div class="height">
    <div class="height-span" />
    <h3>Height : <span id="height" />px</h3>
  </div>
  <div class="width">
    <h3>Width : <span id="width" />px</h3>
    <div class="width-span" />
  </div>
</div>
