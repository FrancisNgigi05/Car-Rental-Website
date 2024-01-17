// DOM Render Functions
function renderOneCar(car) {
    // Build the car card container
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
        <img src="${car.imageUrl}">
        <div class="content">
            <h2>${car.brand}</h2>
            <p>${car.model}</p>
            <p>${car.price}</p>
            <p>
                <span class="car_count">${car.available}</span> Available
            </p>
            <button id="reserve" >Reserve</button>
        </div> 
    `
    // Add the car card to the DOM
    document.querySelector('#car-list').appendChild(card);
}

// Fetch Requests
// Get Fetch for all car resources
function getAllCars() {
    fetch('https://cars-api-m7at.onrender.com/Cars')
    .then(resp => resp.json())
    .then(carData => carData.forEach(car => renderOneCar(car)))
}   
// Initialize Render
// Get all cars and render our cars to the DOM
function initialize() {
    getAllCars();
}
initialize();