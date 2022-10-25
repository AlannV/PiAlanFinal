import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import BreedCreate from "./components/BreedCreate";
import Detail from "./components/Detail";
import Success from "./components/Success";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/breed" component={BreedCreate} />
          <Route exact path="/home/:id" component={Detail} />
          <Route exact path="/home/success" component={Success} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
