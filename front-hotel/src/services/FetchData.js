export class FetchData {
  constructor() {
    this.url = "http://localhost:8000";
    this.header = {
      "Content-Type": "application/json",
      //Authorization: `Basic + ${btoa("admin:admin")}`, //Gestion de l'authentification
    };
    this.credentials = "same-origin";
  }

  getReservations = () => {
    return fetch(`${this.url}/admin/reservations`, {
      credentials: this.credentials,
      method: "GET",
      headers: this.header,
    })
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Erreur", response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("dans le fetch get reservation :", data);
        return data;
      });
  };

  getCategory = () => {
    return fetch(`${this.url}/admin/categories`, {
      credentials: this.credentials,
      method: "GET",
      headers: this.header,
    })
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Erreur", response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("dans le fetch get category :", data);
        return data;
      });
  };

  getPeriods = () => {
    return fetch(`${this.url}/admin/periods`, {
      credentials: this.credentials,
      method: "GET",
      headers: this.header,
    })
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Erreur" + response.json());
        }
        console.log("Dans le fetch de periods");
        return response.json();
      })
      .then(function (data) {
        console.log("dans le fetch get periods :" + data);
        return data;
      });
  };
  postReservation = ({ startDate, endDate, persons, category }) => {
    return fetch(
      `${this.url}/booking/try-booking?startDate=${startDate}&endDate=${endDate}&persons=${persons}&category=${category}`,
      {
        credentials: this.credentials,
        method: "POST",
        headers: this.header,
        body: JSON.stringify({
          customer: {
            firstName: "string",
            lastName: "string",
            phone: "string",
            email: "string",
            address: {
              street: "string",
              zipcode: "string",
              city: "string",
              country: "string",
            },
          },
        }),
      }
    )
      .then(async function (response) {
        if (response.status !== 201) {
          console.log("erreur :", response);
          throw await response.json();
        }
        return response.json();
      })
      .then(function (data) {
        console.log("dans le fetch :", data);
        return data;
      });
  };
  /*Ajouter le fetch de supressions et faire fonctionner le bouton de supression 
  dans la page*/
  deleteReservation = (code) => {
    return fetch(`${this.url}/booking/${code}`, {
      credentials: this.credentials,
      method: "DELETE",
      headers: this.header,
    })
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Erreur", response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("dans le fetch delete reservation :", data);
        return data;
      });
  };
  /**
   * Créer une méthode fetch qui va utilisé le booking available
   */
}
