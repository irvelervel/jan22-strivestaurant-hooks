import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import Home from "./components/Home";

function App() {
  return (
    <>
      {/* NAVBAR COMPONENT */}
      <CustomNavbar payoff="Perfect Pasta Makers" margin={0} />
      {/* HOMEPAGE COMPONENT */}
      <Home />
    </>
  );
}

export default App;

// now our goal is to ditch any class component, and just use functional ones
// without losing any functionality!
