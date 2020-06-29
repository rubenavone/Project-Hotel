fetch("http://localhost:8000/admin/reservations", {
  credentials: "same-origin",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic + ${btoa("admin:admin")}`, //Gestion de l'authentification
  },
})
  .then(function (response) {
    if (response.status != 200) {
      throw new Error("Erreur", response.status);
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
