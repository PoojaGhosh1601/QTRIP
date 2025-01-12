
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

   // Create a URLSearchParams object from the search string
   debugger;
   const params = new URLSearchParams(search);   
   const city = params.get('city');   
   return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {
    
    //const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);

    const response = await fetch(`http://3.6.40.97:8082/adventures?city=${city}`);

    
    if (!response.ok) {
        throw new Error(`Error fetching adventures: ${response.statusText}`);
    }

    
    const adventures = await response.json();

    
    return adventures;
} catch (error) {
    console.error('Failed to fetch adventures:', error);
    return null; 
}

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  // Get the container where the adventure cards will be added
  const dataContainer = document.getElementById("data");

  // Clear existing content in case this function is called multiple times
  dataContainer.innerHTML = '';

  // Loop through each adventure and create a card
  adventures.forEach(adventure => {
      // Create the card wrapper
      const cardDiv = document.createElement("div");
      cardDiv.className = "col-md-4"; // Bootstrap class for responsive grid

      // Create the link for the adventure
      const adventureLink = document.createElement("a");
      adventureLink.href = `detail/?adventure=${adventure.id}`;
      adventureLink.id = adventure.id; // Set the link

      // Create the card element
      const card = document.createElement("div");
      card.className = "activity-card";

      // Create and set the image element
      const img = document.createElement("img");
      img.src = adventure.image; // Use the adventure's image URL
      img.alt = adventure.name; // Set alt text for accessibility
      img.className = "card-img-top"; // Bootstrap class for image

      // Create the category banner
      const categoryBanner = document.createElement("div");
      categoryBanner.className = "category-banner";
      categoryBanner.innerText = adventure.category; // Set the category text

      // Create the card body content
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // Create the adventure name element
      const adventureName = document.createElement("h5");
      adventureName.innerText = adventure.name; // Set the adventure name

      // Create the cost per head element
      const costPerHead = document.createElement("p");
      costPerHead.innerText = `Cost per head: ₹${adventure.costPerHead}`; // Set the cost text

      // Create the duration element
      const duration = document.createElement("p");
      duration.innerText = `Duration: ${adventure.duration} Hours`; // Set the duration text

      // Assemble the card
      cardBody.appendChild(adventureName);
      cardBody.appendChild(costPerHead);
      cardBody.appendChild(duration);
      card.appendChild(categoryBanner);
      card.appendChild(img);
      card.appendChild(cardBody);
      adventureLink.appendChild(card);
      cardDiv.appendChild(adventureLink);
      
      // Append the card to the container
      dataContainer.appendChild(cardDiv);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {  //1
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  debugger;
  return list.filter(adventure => {
    return adventure.duration >= low && adventure.duration <= high;
  });

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {  //2
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  debugger;
  if (!categoryList || categoryList.length === 0) {
    return list; // If no categories, return the original list
  }

  return list.filter(adventure => categoryList.includes(adventure.category));


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {  //3
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  debugger;
  //let filteredAdventures = list;
// Check if the filters object has a category filter
if (filters.duration.length!==0 && filters.category.length===0) {
  // Filter by category
  let low=filters.duration.split("-")[0]
    let high=filters.duration.split("-")[1]
    let filByDuration=filterByDuration(list, low, high)
    return filByDuration;
  //return filterByCategory(filteredAdventures, filters.category);
}

else if (filters.category.length!==0 && filters.duration.length===0){
  let filByCategory=filterByCategory(list, filters.category)
}
// Apply duration filter if it's set
else if (filters.duration.length!==0 && filters.category.length!==0){
  let low=filters.duration.split("-")[0]
  let high=filters.duration.split("-")[1]
  let filByDuration=filterByDuration(list, low, high)
  let filByCategory=filterByCategory(list, filters.category)
  // Place holder for functionality to work in the Stubs
  let filByDurationIds=filByDuration.map((adv)=>{
    return adv.id
  })
  let filteredAdvs=filByCategory.filter((advs)=>{
    return filByDurationIds.includes(advs.id)
  })
  return filteredAdvs;
}
return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {  //4
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {  //5
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const filters = localStorage.getItem("filters");
  
  if (filters) {
    return JSON.parse(filters);
  } else {
    return null;  // Return null if no filters are found
  }
  // Place holder for functionality to work in the Stubs

  //return null;
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {  //6
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const categoryList = document.getElementById("category-list");
  
  // Clear any existing filter pills
  categoryList.innerHTML = "";

  // If there are selected categories, create pills for them
  filters.category.forEach(category => {
    // Create the pill div
    const pill = document.createElement("div");
    pill.classList.add("filter-pill", "d-flex", "align-items-center", "m-1");

    // Add the category name to the pill
    const pillText = document.createElement("span");
    pillText.textContent = category;

    // Add a "Clear" button to remove the category filter
    const clearButton = document.createElement("span");
    clearButton.textContent = "x";
    clearButton.classList.add("ms-2", "clear-pill");
    clearButton.style.cursor = "pointer";

    // Add the event listener to remove the category filter when the "x" is clicked
    clearButton.addEventListener("click", () => {
      // Remove the category from the filter list
      filters.category = filters.category.filter(c => c !== category);

      // Update the filter pills and adventures
      generateFilterPillsAndUpdateDOM(filters);
      let filteredAdventures = filterFunction(adventures, filters);
      addAdventureToDOM(filteredAdventures);

      // Save the updated filters to localStorage
      saveFiltersToLocalStorage(filters);
    });

    // Append the text and clear button to the pill
    pill.appendChild(pillText);
    pill.appendChild(clearButton);

    // Append the pill to the category list
    categoryList.appendChild(pill);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
