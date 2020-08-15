const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random-btn'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');



// Search meal and fetch from API

function searchMeal(e) {
    e.preventDefault();

    // clear single meal

    single_mealEl.innerHTML = '';

    //get search term

    const term = search.value;

    //check for empty

    if (term.trim()) {

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2> Search results for '${term}':  </h2>`;

                if (data.meals === null) {

                    resultHeading.innerHTML = `<h3>No search results found for  <h1> "${term}" </h1> .<br>Try Other Meals </h3>`;
                    mealsEl.innerHTML = '';
                } else {

                    mealsEl.innerHTML = data.meals.map(meal =>
                            `<div class='meal'>

                        <img src = "${meal.strMealThumb}" alt ="$meal.strMeal" />

                        <div class = "meal-info" data-mealID = "${meal.idMeal}">
<h3> ${meal.strMeal} </h3>
                        </div>

                        </div>`)
                        .join('');

                }

            });

        //clear search text

        search.value = '';


    } else {
        alert('Please enter a meal');

    }


}

// Fetch meal by ID function

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

// Fetch random Meal

function getrandomMeal() {
    //clear headings and meal
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {

            const meal = data.meals[0];

            addMealToDOM(meal);

        })
}

// Add meal to dom

function addMealToDOM(meal) {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);


    }else {

        break;

    }
}

 single_mealEl.innerHTML = `
 
 <div class='single-meal'>

 <h1> ${meal.strMeal}</h1>
 <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

 <div class="single-meal-info">

${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
${meal.strArea ? `<p>${meal.strArea}</p>` : ''}

 </div>

 <div class='main'>

 <p> ${meal.strInstructions} </p>
 <h2> Ingredients </h2>

 <ul> 
  ${ingredients.map( ing => `<li>${ing}</li>`).join('')}

 </ul>
 </div>
 </div>
 
 `;

}



// Event listeners

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getrandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealById(mealID);
    }
});