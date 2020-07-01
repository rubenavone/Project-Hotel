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
    <header className="container-fluid">
      <div className="row align-items-center">
        <div className="col-3 mt-4 mb-0">
          <Link to="/home">
            <img
              className="img-fluid "
              src="/image2vector.svg"
              alt="retour accueil - Hotel Paradise"
            />
          </Link>
        </div>
        <div className="col"></div>
        <div className="container">
          <div className="row">
            <nav className="col d-flex align-items-end justify-content-end ">
              <ul className="list-unstyled text-dark ">
                <li>
                  <Link
                    className={isSelected("/admin")}
                    to="/admin/reservations"
                  >
                    Administration
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="row">
            <div className="col align-content-end ">
              <h1 className=" d-flex align-items-end justify-content-end title-stylised col-md-11 mt-5 display-absolute">
                Un paradis sur terre
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
