import React, { Component } from "react";
import { FetchData } from "./../../services/FetchData";
class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      error: false,
    };
    this.fd = new FetchData();
  }
  //aficher les donnée et gerer le cas des erreur sur l'ecran
  successCategory = (data) => {
    console.log(" Dans Success Category:", data);
    //copie du state
    const copyState = { ...this.state };
    //modification de la copie du state
    copyState.category = data;
    this.setState(copyState);
  };

  /**
   * Si une erreur est presente on change la propriété de l'objet state
   * @param {string} error
   */
  failedCategory = (error) => {
    console.log("Failed Category :", error);
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
        const data = await this.fd.getCategory();
        console.log("data apres le await de category", data);
        this.successCategory(data);
      } catch (error) {
        this.failedCategory(error);
      }
    };
    fetchDataAsync();
  };

  render() {
    const categories = this.state.category;
    return (
      <div className="col">
        <div className="row">
          <div className="col  mb-2 rounded ">
            <h1 className="m-2 text-center">Categorie</h1>
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
                <th>Description</th>
                <th>Nombre de lits</th>
                <th>Nombre de chambre</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.persons}</td>
                    <td>{`${category.data.rooms.length}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-dark btn-lg btn-block">
            Ajouter une catégorie de chambre
          </button>
        </div>
      </div>
    );
  }
}

export default Rooms;
