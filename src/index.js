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
}

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
            <div class="card_buttons" >
                <button id="reserve" >Reserve</button>
                <button id="remove" >Remove</button>
            </div>
        </div> 
    `
    card.querySelector('#reserve').addEventListener('click', () => {
        car.available -= 1
        card.querySelector('span').textContent = car.available
        updateCar(car)
    })
    card.querySelector('#remove').addEventListener('click', () => {
        card.remove()
        deleteCar(car.id)
    })

    
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