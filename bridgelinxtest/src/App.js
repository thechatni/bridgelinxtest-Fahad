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
                {/* <RecoilRoot> */}
                <Home />
                {/* </RecoilRoot> */}
              </Route>
              <Route path="/movie/:id">
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
