import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservationsProm = await fetch(config.backendEndpoint + "/reservations")
    let reservationsData = await reservationsProm.json()
    return reservationsData
  }
  catch (err) {
    return null
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  let noResv_banner = document.getElementById("no-reservation-banner")
  let table_parent = document.getElementById("reservation-table-parent")
  if (reservations.length === 0) {
    noResv_banner.style.display = "block";
    table_parent.style.display = "none";
  }
  else {
    noResv_banner.style.display = "none";
    table_parent.style.display = "block";
    let table_body = document.getElementById("reservation-table")
    reservations.forEach((res) => {
      let adv_link = `../detail/?adventure=${res.adventure}`
      table_body.innerHTML += `
      <tr>
      <td><b>${res.id}</b></td>
      <td>${res.name}</td>
      <td>${res.adventureName}</td>
      <td>${res.person}</td>
      <td>${new Date(res.date).toLocaleDateString("en-IN")}</td>
      <td>${res.price}</td>
      <td>${new Date(res.time).toLocaleString("en-IN", { day: "numeric", month: "long", year: "numeric" })}, ${new Date(res.time).toLocaleTimeString(("en-IN"))}</td>
      <td><button class="reservation-visit-button" id=${res.id}><a href=${adv_link}>Visit Adventure</a></button></td>
      </tr>
      `
    });
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
