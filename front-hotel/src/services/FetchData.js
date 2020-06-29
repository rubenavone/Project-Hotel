export class FetchData {
  constructor() {
    this.url = "http://localhost:8000/";
    this.header = {
      "Content-Type": "application/json",
      //Authorization: `Basic + ${btoa("admin:admin")}`, //Gestion de l'authentification
    };
    this.credentials = "same-origin";
  }

  getReservations = () => {
    return fetch(`${this.url}admin/reservations`, {
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
        console.log("dans le fetch :", data);
        return data;
      });
  };

  postReservation = ({ startDate, endDate, persons, category }) => {
    fetch(
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
      .then(function (response) {
        console.log(response.json());
        if (response.status !== 200) {
          throw new Error("Erreur", response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("dans le fetch :", data);
        return data;
      });
  };
}
