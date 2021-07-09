import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/movie/:imdbId">
                <Movie />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
