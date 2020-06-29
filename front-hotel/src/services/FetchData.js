export class FetchData {
  constructor() {
    this.url = "http://localhost:8000/";
    this.header = {
      "Content-Type": "application/json",
      Authorization: `Basic + ${btoa("admin:admin")}`, //Gestion de l'authentification
    };
    this.credentials = "same-origin";
  }

  getReservations = (success, failed) => {
    fetch(`${this.url}admin/reservations`, {
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
        console.log(data);
        success(data);
      })
      .catch((error) => {
        failed(error);
      });
  };
}
