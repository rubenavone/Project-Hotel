import React, { Component } from "react";
import Header from "../common/Header";
import { FetchData } from "../../services/FetchData";

export default class Home extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
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
      await this.fd.postReservation(payload_reservation);
      console.log("ça c'est bien passé ");
    } catch (error) {
      console.log("Une erreur est survenue", error);
    }
  };

  render() {
    return (
      <main className="container">
        <Header path="/" />
        <div className="row">
          <h1 className="text-center m-3">Formulaire de réservation</h1>

          <form onSubmit={this.handleSubmit} className="p-3 mt-5">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="start-date-js">
                  date d'arrivée :
                  <input
                    required={true}
                    id="start-date-js"
                    type="date"
                    defaultValue=""
                    className="form-control"
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
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="persons-js">
                  Nombre de personnes :
                  <input
                    required={true}
                    id="persons-js"
                    type="number"
                    max="4"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="room-for-js">
                  Catégory de chambre :
                  <select required={true} id="room-js" className="form-control">
                    <option value="1">Chambre simple</option>
                    <option value="2">Chambre double</option>
                    <option value="3">
                      Chambre double - deux lits une place
                    </option>
                    <option value="4">
                      Chambre triple - une lit double, un lits une place
                    </option>
                    <option value="5">Chambre pour quatre</option>
                  </select>
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Envoyer
            </button>
          </form>
        </div>
      </main>
    );
  }
}
