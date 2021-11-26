import Preload from "./components/preload";
import Navbar from "./components/navbar";
import Gtm from "./seo/gtm";
import { BrowserRouter as Router,  Routes, Route  } from "react-router-dom";
import Dimension from "./components/dimension";
import Wcu from "./components/rcuwcu";
import Home from "./components/home";
function App() {
  return (
    <div className="rahulahire.com">
      <Router>
        <Gtm />
        <Preload />
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dimension" exact element={<Dimension />} />
        <Route path="/dynamodb-wrcu" element={<Wcu />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
