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

        <div className="row">
          <h1 className="col-md-11 mt-5">Le paradis sur terre</h1>
          <nav className="col-md-1 mb-5">
            <ul className="list-unstyled text-dark justify-content-end ">
              <li>
                <Link className={isSelected("/admin")} to="/admin/reservations">
                  Administration
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
