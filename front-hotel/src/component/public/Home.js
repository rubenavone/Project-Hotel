import React, { Component } from "react";
import Header from "../common/Header";
import { FetchData } from "../../services/FetchData";
import { Route, Switch, Link } from "react-router-dom";
import HotelPreview from "./HotelPreview";
import hotelServices from "./HotelServices";
import Restaurant from "./Restaurant";
import Price from "./Price";

export default class Home extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      reservation: null,
    };

    this.fd = new FetchData();
  }

  handleSubmit = async (event) => {
    console.log("Dans handle submit");
    event.preventDefault();

    const payload_reservation = {
      startDate: event.target.querySelector("#start-date-js").value,
      endDate: event.target.querySelector("#end-date-js").value,
      persons: event.target.querySelector("#persons-js").value,
      category: event.target.querySelector("#room-js").value,
    };

    //output value for test
    console.log("Date d'arrivée: ", payload_reservation.startDate);
    console.log("Date de départ: ", payload_reservation.endDate);
    console.log("Nombre de personnes:", payload_reservation.persons);
    console.log("Catégorie de chambre ", payload_reservation.category);

    //Input testing

    //POST
    try {
      const reservation = await this.fd.postReservation(payload_reservation);
      console.log(" Dans Success Reservation :", reservation);
      //copie du state
      const copyState = { ...this.state };
      //modification de la copie du state
      copyState.reservation = reservation;
      copyState.error = null;
      this.setState(copyState);
      console.log(this.state);
    } catch (error) {
      console.log("Une erreur est survenue", error);
      //copie du state
      const copyState = { ...this.state };
      //modification de la copie du state
      copyState.error = error;
      this.setState(copyState);
      console.log(this.state);
    }
  };
  isSelected = (path) => {
    const urlPath = this.props.location.pathname;
    console.log(urlPath);
    // return path === this.props.path
    //   ? "rounded mt-3 p-2 h5 btn-danger"
    //   : " rounded mt-3 p-2 h5 btn-primary";
    return path === urlPath
      ? "rounded m-4 p-2 h5 btn-danger"
      : " rounded m-4 p-2 h5 btn-primary";
  };
  handleClickDelete = async (event) => {
    console.log("Dans handle submit ");
    const userUuid = this.state.reservation.code;
    console.log("Code de l'utilisateur", userUuid);
    try {
      await this.fd.deleteReservation(this.state.reservation.code);
      const copyState = { ...this.state };
      copyState.reservation = null;
      this.setState(copyState);
    } catch (error) {
      console.log("Une erreur est survenue pendant la supression");
      const copyState = { ...this.State };
      copyState.error = error;
      this.setState(copyState);
    }
  };
  formRender() {
    return (
      <div className="row form-home">
        <form
          onSubmit={this.handleSubmit}
          className="p-3 mt-5 shadow-lg rounded-lg background-white"
        >
          <h1 className="text-center m-3">Réservation</h1>
          {this.state.error && (
            <p className="text-danger text-center">
              {this.state.error.message}
            </p>
          )}
          <div className="form-row ">
            <div className="form-group col-md-6">
              <label htmlFor="start-date-js">
                date d'arrivée :
                <input
                  required={true}
                  id="start-date-js"
                  type="date"
                  defaultValue=""
                  className="form-control "
                />
              </label>
            </div>

            <label htmlFor="end-date-js">
              date de départ :
              <input
                required={true}
                id="end-date-js"
                type="date"
                defaultValue=""
                className="form-control"
              />
            </label>
          </div>
          <div className="form-row ">
            <div className="col-md-6">
              <label htmlFor="persons-js">
                Nombre de personnes :
                <select
                  required={true}
                  id="persons-js"
                  className="form-control"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </label>
            </div>
            <div className="col-md-6">
              <label htmlFor="room-for-js">
                Catégorie de chambre :
                <select required={true} id="room-js" className="form-control">
                  <option value="1">Chambre simple</option>
                  <option value="2">Chambre double</option>
                  <option value="3">
                    Chambre double - deux lits une place
                  </option>
                  <option value="4">
                    Chambre triple - une lit double, un lits une place
                  </option>
                </select>
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Envoyer
          </button>
        </form>
      </div>
    );
  }
  render() {
    const reservation = this.state.reservation;
    return (
      <main className="container-fluid ">
        <Header path="/" />
        <div className="position-relative row">
          <div className="col">
            <img
              src="image_de_fond_hotel_3.jpg"
              alt=""
              className="img-fluid img-resize"
            />
          </div>
        </div>
        <div className="row bg-primary m-0 align-items-center text-black-50">
          <div className="col-3"></div>
          <nav className="col-9">
            <ul className="d-flex list-unstyled text-light nav-second ">
              <li className=" mt-2">
                <Link className={`ml-3 mr-3 text-black-50 h4`} to="/home">
                  Notre Hotel
                </Link>
              </li>
              <li className="mt-2">
                <Link className={`ml-3 mr-3 text-black-50 h4`} to="/services">
                  Parking et services
                </Link>
              </li>
              <li className="mt-2">
                <Link className={`ml-3 mr-3 text-black-50 h4`} to="/restaurant">
                  Restaurant
                </Link>
              </li>
              <li className="mt-2">
                <Link className={`ml-3 mr-3 text-black-50 h4`} to="/price">
                  Tarif des Chambres
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Rendu du formulaire */}
        {this.formRender()}
        {/****/}
        <Switch>
          <Route path="/home" component={HotelPreview} />
          <Route path="/services" component={hotelServices} />
          <Route path="/restaurant" component={Restaurant} />
          <Route path="/price" component={Price} />
        </Switch>
        {this.state.reservation && (
          <div className="row mb-5">
            <div className="col-3"></div>
            <div className="col-7">
              <h2 className="m-3 text-center">Votre Réservation</h2>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Nombre de personne</th>
                    <th>Numéro de réservation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={reservation.id}>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td>{reservation.data.persons}</td>
                    <td>{reservation.code}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-danger btn-lg btn-block"
                onClick={this.handleClickDelete}
              >
                Supprimer votre réservation
              </button>
              <div className="col-2"></div>
            </div>
          </div>
        )}
      </main>
    );
  }
}
