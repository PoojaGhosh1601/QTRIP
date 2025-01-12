import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  debugger;
  console.log("from init");
  console.log(config);
  
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
debugger;
  try {
    //const response = await fetch(`${config.backendEndpoint}/cities`);
    const response = await fetch("https://qtrip-dynamic-nipl.onrender.com/cities/");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const cities = await response.json();
    return cities;
} catch (error) {
    console.error('Error fetching cities:', error);
    return null;
}

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

 
    // Create a div for the city card
    const cityCard = document.createElement('div');
    cityCard.className = 'col-md-4'; 
  
    // Create a link element
    const cityLink = document.createElement('a');
    cityLink.href = `pages/adventures/?city=${id}`; 
    cityLink.id = id; 
  
    
    const cardContent = `
      <div class="card mb-4">
        <img src="${image}" class="card-img-top" alt="${city}">
        <div class="card-body">
          <h5 class="card-title">${city}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    `;
  
    // Set the inner HTML of the city link
    cityLink.innerHTML = cardContent;
  
    // Append the link (which contains the card) to the city card div
    cityCard.appendChild(cityLink);
  
    // Append the city card to the content section
    const dataContainer = document.getElementById('data');
    dataContainer.appendChild(cityCard);
  
  

}

export { init, fetchCities, addCityToDOM };
