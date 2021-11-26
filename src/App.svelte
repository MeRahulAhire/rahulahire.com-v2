<script>
  import Preload from "./components/preload.svelte";
  import GTM from "./seo/gtm.svelte";
  import Router from "./components/route.svelte";
</script>

<svelte:head>
  <meta name="theme-color" content="#0f0f0f" />
</svelte:head>

<div id="app-container">
  <Preload />
  <GTM />
  <Router />
</div>
