import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let parameter = new URLSearchParams(search);
  return parameter.get("adventure");
  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let advProm = await fetch(
        config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    let advData = await advProm.json();
    return advData;
} catch (err) {
    return null;
}

  // Place holder for functionality to work in the Stubs
 // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent =
      adventure.subtitle;
  let photos = document.getElementById("photo-gallery");
  adventure.images.forEach((link) => {
      photos.innerHTML += `<img src=${link} class="activity-card-image">`;
  });
  document.getElementById("adventure-content").textContent = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById(
    "photo-gallery"
).innerHTML = `<div id="carouselExampleIndicators" class="carousel slide">
<div class="carousel-indicators">
<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="car-inr">

</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>`;

let carouselInner = document.getElementById("car-inr");
images.forEach((link, index) => {
    let divInner = document.createElement("div");
    index === 0
        ? divInner.setAttribute("class", "carousel-item active")
        : divInner.setAttribute("class", "carousel-item")
    divInner.innerHTML = `<img src=${link} class="d-block w-100 activity-card-image">`;
    carouselInner.append(divInner);
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  let reservation_available = document.getElementById("reservation-panel-available")
  let sold_out = document.getElementById("reservation-panel-sold-out")
  if (adventure.available === true) {
      reservation_available.style.display = "block"
      sold_out.style.display = "none"
      let reservation_cost = document.getElementById("reservation-person-cost")
      reservation_cost.textContent = adventure.costPerHead
  }
  else {
      reservation_available.style.display = "none"
      sold_out.style.display = "block"
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = document.getElementById("reservation-cost")
  cost.textContent = adventure.costPerHead * persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
      event.preventDefault();
      // let formData=new FormData(event.target)
      // console.log(formData)
      // let formObj=Object.fromEntries(formData)
      // console.log(formObj)
      // formObj.adventure=adventure.id
      // console.log(formObj)
      let data = {
          name: event.target.elements.name.value,
          date: event.target.elements.date.value,
          person: event.target.elements.person.value,
          adventure: adventure.id
      }
      let resv = await fetch(config.backendEndpoint + "/reservations/new", {
          method: "POST",
          body: JSON.stringify(data),
          // body:JSON.stringify(formObj),
          headers: {
              "Content-Type": "application/json"
          }
      })
      if (resv.ok) {
          alert("Success!");
          location.reload();
      }
      else {
          alert("Failed!");
      }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservation_banner = document.getElementById("reserved-banner")
    if (adventure.reserved === true) {
        reservation_banner.style.display = "block"
    }
    else {
        reservation_banner.style.display = "none"
    }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
