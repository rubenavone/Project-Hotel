import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  /**
   * Fonction de redirection
   */
  // const redirectLink = (event) => {
  //   event.preventDefault();
  //   // const url = event.target.getAttribute("href"); //Récuperation du lien dans le lien
  //   // console.log(url);
  //   // return <Redirect to={url} />;
  // };

  const isSelected = (path) => {
    return path === props.path
      ? "rounded mt-3 p-2 h5 btn-danger"
      : " rounded mt-3 p-2 h5 btn-primary";
  };

  return (
    <header className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <Link to="/home">
            <img
              className="img-fluid "
              src="/image2vector.svg"
              alt="retour accueil - Hotel Paradise"
            />
          </Link>
        </div>
        <div className="col-md-8">
          <h1>Le paradis sur terre</h1>
          <nav>
            <ul className="list-unstyled text-dark d-flex justify-content-end ">
              {/* <li>
              <Link className={isSelected("/")} to="/">
                Acceuil
              </Link>
            </li> */}
              <li>
                <Link className={isSelected("/admin")} to="/admin/reservations">
                  Administration
                </Link>
              </li>
              {/* <li>
              <a className="p-4" href="#" onClick={redirectLink}>
                Nous contactez
              </a>
            </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
