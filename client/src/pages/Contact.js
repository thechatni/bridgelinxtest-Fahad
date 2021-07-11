import Navbar from "../components/Nav-bar";

const Contact = () => {
  return (
    <>
      <Navbar back={true} />
      <div className="all">
        <div id="contacts">
          <div>
            <ul className="c-rainbow">
              <li className="c-rainbow__layer c-rainbow__layer--white">
                MADE BY FAHAD AHMAD
              </li>
              <li className="c-rainbow__layer c-rainbow__layer--orange">
                MADE BY FAHAD AHMAD
              </li>
              <li className="c-rainbow__layer c-rainbow__layer--red">
                MADE BY FAHAD AHMAD
              </li>
              <li className="c-rainbow__layer c-rainbow__layer--violet">
                MADE BY FAHAD AHMAD
              </li>
              <li className="c-rainbow__layer c-rainbow__layer--blue">
                MADE BY FAHAD AHMAD
              </li>
              <li className="c-rainbow__layer c-rainbow__layer--green">
                MADE BY FAHAD AHMAD
              </li>
              <li className="c-rainbow__layer c-rainbow__layer--yellow">
                MADE BY FAHAD AHMAD
              </li>
            </ul>
          </div>
          <h2>GITHUB Link:</h2>
          <p>
            <a href="https://github.com/thechatni/bridgelinxtest-Fahad">
              https://github.com/thechatni/bridgelinxtest-Fahad
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
