var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php";
var selectElement = document.querySelector('select');
var showEl = document.querySelector(".showEl");


selectElement.addEventListener('change', (event) => {
    showEl.classList.remove("hide");
    console.log(event.target.value);
    if (event.target.value === "1") {
        fetch(randomMeal)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('DATA', data.meals[0]);
                var meal = data.meals[0];
                var mealData = {
                    name: '',
                    instructions: '',
                    ingredients: [],
                    source: '',
                    image: ''
                };
                for(var prop in meal) {
                    if (prop === "strMeal") { // name
                        mealData.name = meal[prop];
                    }

                    if (prop === "strInstructions") { // instructions
                        mealData.instructions = meal[prop];
                    }

                    if (prop.includes("strIngredient") && meal[prop]) { // ingredients that have values
                        mealData.ingredients.push(meal[prop]);
                    }

                    if (prop === "strSource") { // source
                        mealData.source = meal[prop];
                    }

                    if (prop === "strMealThumb") { // image
                        mealData.image = meal[prop];
                    }
                }
                console.log(mealData);
            })

    } else {
        fetch(randomDrink)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("Drinks", data.drinks[0])
                var drink = data.drinks[0];
                var drinkData = {
                    name: '',
                    instructions: '',
                    ingredients: [],
                    source: '',
                    image: ''
                };
                for(var prop in drink) {
                    if (prop === "strDrink") { // name
                        drinkData.name = drink[prop];
                    }

                    if (prop === "strInstructions") { // instructions
                        drinkData.instructions = drink[prop];
                    }

                    if (prop.includes("strIngredient") && drink[prop]) { // ingredients that have values
                        drinkData.ingredients.push(drink[prop]);
                    }

                    if (prop === "strDrinkThumb") { // image
                        drinkData.image = drink[prop];
                    }
                }
                console.log(drinkData);
            })
            };
    }


);

