import React, { Component } from "react";
import { FetchData } from "./../../services/FetchData";
class Periods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periods: [],
      error: false,
    };
    this.fd = new FetchData();
  }
  //aficher les donnée et gerer le cas des erreur sur l'ecran
  successPeriods = (data) => {
    console.log(" Dans Success Periods:", data);
    //copie du state
    const copyState = { ...this.state };
    //modification de la copie du state
    copyState.periods = data;
    this.setState(copyState);
  };

  /**
   * Si une erreur est presente on change la propriété de l'objet state
   * @param {string} error
   */
  failedPeriods = (error) => {
    console.log("Failed Periods :", error);
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
        const data = await this.fd.getPeriods();
        console.log("data apres le await de periods", data);
        this.successPeriods(data);
      } catch (error) {
        this.failedPeriods(error);
      }
    };
    fetchDataAsync();
  };

  render() {
    const periods = this.state.periods;
    return (
      <div className="row">
        <div className="col">
          <h1 className="m-3 text-center">Periods</h1>

          {this.state.error && (
            <div className="container text-danger">
              <h2>le code de l'erreur est {this.state.error.message}</h2>
              <p>Merci de contactez l'administrateur</p>
            </div>
          )}
        </div>

        <table className="table table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Catégorie</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>di/lu/ma/me/je/ve/sa</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => {
              return (
                <tr key={period.id}>
                  <td>{period.id}</td>
                  <td>{period.categoryId}</td>
                  <td>{period.startDate}</td>
                  <td>{period.endDate}</td>
                  <td>{`${period.data.prices.toString()}`}</td>
                  {/**
                   * Faire une methode qui utilise String.reaplace
                   * pour changer la virgule par un slash
                   */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-dark btn-lg btn-block">
          Ajouter une période de prix
        </button>
      </div>
    );
  }
}

export default Periods;
