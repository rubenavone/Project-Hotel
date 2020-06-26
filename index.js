// getTerms = (successCallback) => {
//   fetch("http://localhost:8000/admin/reservations", {
//     credentials: "same-origin",
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       //Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
//     },
//   }).then(function (response) {
//     if (response.status !== 200) {
//       // Il y a un problème, le statut de la réponse n'est pas le bon
//       console.error("Erreur - statut : " + response.status);
//     } else {
//       // Ca roule... mais encore faut-il que la
//       // réponse soit dans le bon format
//       response.text().then(function (data) {
//         console.log("donnée : ", data);
//         // On appelle le callback
//         successCallback(data);
//       });
//     }
//   });
// };

fetch("http://localhost:8000/admin/reservations", {
  credentials: "same-origin",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
