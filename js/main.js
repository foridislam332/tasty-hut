const fetchData = async (searchValue) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
        const response = await fetch(url)
        const data = await response.json();
        displayData(data.meals)
    }
    catch (error) {
        console.log(error)
    }
}

const searchByName = () => {
    const inputField = document.getElementById('input_field');
    const inputValue = inputField.value;
    inputField.value = '';
    console.log('cliekced', inputValue)
    fetchData(inputValue)
}
const displayData = foods => {
    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML = '';
    foods.map(food => {
        console.log(food.idMeal)
        const div = document.createElement('div');
        div.classList.add('shadow', 'd-flex', 'w-100', 'border', 'rounded-3', 'card_details')
        div.innerHTML = `
        <img src="${food.strMealThumb}" class="card_img rounded-3 alt="food">
        <div class="p-4 d-flex flex-column align-items-start justify-content-center">
            <h4 class="card-title fw-bold">${food.strMeal}</h4>
            <p class="card-text mt-2">${food.strInstructions.slice(0, 80)} ...</p>
            <a onclick="fetchDetails(${food.idMeal})" data-bs-toggle="modal" data-bs-target="#foodModal" class="text-warning text-decoration-underline">View Details</a>
        </div>
        `
        cardContainer.appendChild(div)
    })
}
const fetchDetails = async (id) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        displayFoodDetails(data.meals[0])
    }
    catch (error) {
        console.log(error)
    }
}

const displayFoodDetails = (data) => {
    console.log(data)
    const modalDialog = document.getElementById('modal_dialog');
    modalDialog.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="foodModalLabel">${data.strMeal}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="modal_img d-flex align-items-center justify-content-center mb-4">
        <img src="${data.strMealThumb}" class="h-100 rounded-3 alt="food">
    </div>
    <h6 class="text-muted mb-3"><span class="fw-semibold text-dark">Category :</span> ${data.strCategory}</h6>
    <h6 class="text-muted mb-3"><span class="fw-semibold text-dark">Area :</span> ${data.strArea
        }</h6>
    <h6 class="text-muted mb-3"><span class="fw-semibold text-dark">Instructions :</span> ${data.strInstructions.slice(0, 150)}...</h6>
    <h6 class="text-muted"><span class="fw-semibold text-dark">Youtube :</span> ${data.strYoutube}</h6>
    </div>
    <div class="modal-footer">
        <button type="button" style="background: #DC3545" class="btn btn-secondary border-0" data-bs-dismiss="modal">Close</button>
    </div>
    `
    modalDialog.appendChild(div)
}
fetchData('fish')

