// <script>
//   import { Router, Route } from "svelte-routing";
//   import Navbar from "./navbar.svelte";
//   export let url = "";
// </script>
// <Navbar/>
// <Router {url}>
//   <Route path="/" component={Home} />
//   <Route path="dimension" component={Dimension} />
//   <Route path="/dynamodb-wrcu" component={Wcu} />
// </Router>
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dimension from "./dimension.js";
import Wcu from "./rcuwcu.js";
import Home from "./home.js";
export default function RouteComponent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dimension" exact element={<Dimension />} />
        <Route path="/dynamodb-wrcu" element={<Wcu />} />
      </Routes>
    </>
  );
}
