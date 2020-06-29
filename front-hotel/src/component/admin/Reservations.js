import React, { Component } from "react";
import { FetchData } from "../../services/FetchData";
class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      error: false,
    };
    this.fd = new FetchData(); //singleton une seule instance
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

  /**
   * Si une erreur est presente on change la propriété de l'objet state
   * @param {string} error
   */
  failedReservation = (error) => {
    console.log("Failed Reservation :", error);
    //copie du state
    const copyState = { ...this.state };
    //modification de la copie du state
    copyState.error = error;
    this.setState(copyState);
    console.log(this.state);
  };

  componentDidMount = () => {
    const fetchDataAsync = async () => {
      try {
        const data = await this.fd.getReservations();
        console.log("data apres le await de reservations", data);
        this.successResevation(data);
      } catch (error) {
        this.failedReservation(error);
      }
    };
    fetchDataAsync();
  };

  render = () => {
    const reservation = this.state.reservations;
    return (
      <div className="col">
        <div className="row">
          <div className="col">
            <h1 className="m-3 text-center">Réservation</h1>
          </div>
        </div>
        {this.state.error && (
          <h2>
            le code de l'erreur est {this.state.error.message}
            Merci de contactez l'administrateur
          </h2>
        )}
        <div className="table-responsive">
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
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.categoryId}</td>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td>{reservation.data.persons}</td>
                    <td>{reservation.id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-dark btn-lg btn-block">
            Ajouter une réservation
          </button>
        </div>
      </div>
    );
  };
}

export default Reservations;
