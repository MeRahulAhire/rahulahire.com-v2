<script>
  import Dimension from "./dimension.svelte";
  import Wcu from "./rcuwcu.svelte";
  import Home from "./home.svelte";
  import { Router, Route } from "svelte-routing";
  import Navbar from "./navbar.svelte";
  export let url = "";
</script>
<Navbar/>
<Router {url}>
  <Route path="/" component={Home} />
  <Route path="dimension" component={Dimension} />
  <Route path="/dynamodb-wrcu" component={Wcu} />
</Router>
