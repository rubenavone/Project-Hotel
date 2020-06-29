import React, { Component } from "react";
import { FetchData } from "../../services/FetchData";
class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      error: false,
    };
    this.fd = new FetchData();
  }
  //aficher les donnée et gerer le cas des erreur sur l'ecran
  successResevation = (data) => {
    console.log(" Dans Success Reservation :", data);
    //copie du state
    const copyState = { ...this.state };
    //modification de la copie du state
    copyState.reservations = data;
    this.setState(copyState);
  };

  failedReservation = (error) => {
    console.log("Failed Reservation :", error);
    //copie du state
    const copyState = { ...this.state };
    //modification de la copie du state
    copyState.error = error;
    this.setState(copyState);
  };

  componentDidMount = () => {
    //Tentative de recuperation des donnée

    this.fd.getReservations(this.successResevation, this.failedReservation);
  };

  render = () => {
    const reservation = this.state.reservations;
    return (
      <div className="col">
        <h1>Reservations</h1>
        {this.state.error && (
          <h2>
            le code de l'erreur est {this.state.error.message}
            Merci de contactez l'administrateur
          </h2>
        )}
        <div class="table-responsive">
          <table className="table table-striped ">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Catégorie</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Nombre de personne</th>
                <th>Nombre de nuit</th>
              </tr>
            </thead>
            <tbody>
              {reservation.map((reservation) => {
                return (
                  <tr key>
                    <td>{reservation.id}</td>
                    <td>{reservation.categoryId}</td>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td>{reservation.endDate}</td>
                    <td>{reservation.id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default Reservations;
