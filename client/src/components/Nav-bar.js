import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Backarrow from "../svgComponent/BackArrow";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mySass.scss";

const Navbr = (props) => {
  const history = useHistory();
  return (
    <div id="fullBar">
      <Navbar id="mainBar" bg="myLight" expand="md" collapseOnSelect>
        <Navbar.Brand>
          {(props.back && (
            <div
              onClick={() => {
                history.goBack();
              }}
              className="logoBack"
            >
              <Backarrow />
            </div>
          )) || <h2 id="mainLogo">Bridgelinx React Test</h2>}
        </Navbar.Brand>
        <Nav id="barItems">
          <div id="coll">
            <Link to="/">Home</Link>
            <Link to="/contact">About</Link>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navbr;
