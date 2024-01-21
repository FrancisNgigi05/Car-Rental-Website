// For Mobile Menu
window.onload = function(){
    const toggleButton = document.getElementsByClassName('toggle-button')[0]
  const navbarLinks = document.getElementsByClassName('navbar-links')[0]
  
  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
  })
  }

// For Search Button
document.getElementById('searchButton').addEventListener('click', handleSearch);

function handleSearch() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredCars = cars.filter(car => car.model.toLowerCase().includes(searchTerm));

    // Clear the current car list
    const carListContainer = document.getElementById('car-list');
    carListContainer.innerHTML = '';

    // Render the filtered cars
    filteredCars.forEach(car => {
        renderOneCar(car);
    });

    // Clear the search input
    document.getElementById('search').value = '';
}

// Event Listeners
document.querySelector('#car-form').addEventListener('submit', handleSubmit)

// Event Handlers
function handleSubmit(e) {
    e.preventDefault()
    let carObj ={
        brand: e.target.brand.value,
        model: e.target.model.value,
        price: e.target.price.value,
        available: e.target.available.value,
        imageUrl: e.target.imageUrl.value
    }
    renderOneCar(carObj)
    reserveCar(carObj)
    
    // Reset the form
    e.target.reset();
}

// DOM Render Functions
function renderOneCar(car) {
    // Build the car card container
    let card = document.createElement('li');
    card.className = 'card';
    card.id = `car-${car.id}`; 
    card.innerHTML = `
        <img src="${car.imageUrl}">
        <div class="content">
            <h2>${car.brand}</h2>
            <p>${car.model}</p>
            <p>$${car.price} Per Day</p>
            <p>
                <span class="car_count">${car.available}</span> Available
            </p>
            <div class="card_buttons" >
                <button id="reserve" >Reserve</button>
                <button id="remove" >Remove</button>
            </div>
        </div> 
    `
    card.querySelector('#reserve').addEventListener('click', () => {
        if (car.available > 0) {
            car.available -= 1;
            card.querySelector('span').textContent = car.available;
            updateCar(car);
        } else {
            alert("No more cars available for reservation!");
        }
    });
    
    card.querySelector('#remove').addEventListener('click', () => {
        card.remove()
        deleteCar(car.id)
    })

    
    // Add the car card to the DOM
    document.querySelector('#car-list').appendChild(card);
}

// Fetch Requests
// Get Fetch for all car resources
let cars = [];

function getAllCars() {
    fetch('https://cars-api-m7at.onrender.com/Cars')
        .then(resp => resp.json())
        .then(carData => {
            cars = carData;
            carData.forEach(car => renderOneCar(car));
        })
        .catch(error => console.log(error));
}

// Post Fetch for a new car resource
function reserveCar(carObj) {
    fetch('https://cars-api-m7at.onrender.com/Cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carObj)
    })
    .then(res => res.json())
    .then(car => console.log(car))
    .catch(error => console.log(error))
}

// Patch Fetch for a car resource
function updateCar(carObj) {
    fetch(`https://cars-api-m7at.onrender.com/Cars/${carObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carObj)
    })
    .then(res => res.json())
    .then(car => console.log(car))
}

// Delete Fetch for a car resource
function deleteCar(id) {
    fetch(`https://cars-api-m7at.onrender.com/Cars/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(car => console.log(car))
}
 
// Initialize Render
// Get all cars and render our cars to the DOM
function initialize() {
    getAllCars();
}
initialize();