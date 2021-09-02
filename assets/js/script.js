var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php";
var selectElement = document.querySelector('select');
var showEl = document.querySelector(".showEl");
var popUp = document.getElementById("menu");
var nameEl = document.querySelector(".card-title"); 
var imgEl = document.querySelector(".recipePic");
var ulEl = document.getElementById("ingredients");
var instructionsEl = document.getElementById("instructions");
var sourceEl = document.getElementById("source");
var h6El = document.getElementById("sourceH6");
var saveBtn = document.getElementById("saveBtn");



selectElement.addEventListener('change', (event) => {
    showEl.classList.remove("hide");
    popUp.classList.add("hide");
    console.log(event.target.value);
    if (event.target.value === "1") {
        event.target.value = "";
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
                
                
                imgEl.src = mealData.image;
                nameEl.textContent = mealData.name;
                
                
                ulEl.innerHTML = "";
                
                for(var i=0; i <mealData.ingredients.length; i++){
                    var liEl = document.createElement("li");
                    liEl.textContent = mealData.ingredients[i];
                    ulEl.appendChild(liEl);
                }
                
                instructionsEl.textContent = mealData.instructions;
                
                h6El.textContent = "Link to full recipe: ";
                sourceEl.textContent = mealData.source;
                sourceEl.href = mealData.source;
                


                localStorage.setItem("mealRecipe", JSON.stringify(mealData));
                
            })

    } else {
        event.target.value = "";
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
                console.log(drinkData.image);
                imgEl.src = drinkData.image;
                
                nameEl.textContent = drinkData.name;
                
                ulEl.innerHTML = "";
                
                for(var i=0; i <drinkData.ingredients.length; i++){
                    var liEl = document.createElement("li");
                    liEl.textContent = drinkData.ingredients[i];
                    ulEl.appendChild(liEl);
                }
                
                instructionsEl.textContent = drinkData.instructions;
                
                sourceEl.textContent = "";
                sourceEl.href = "";
                h6El.textContent = "";

                localStorage.setItem("mealRecipe", JSON.stringify(drinkData));
            })
        };
    }
    

);

var toggleTarget = function() {
    var elem = document.querySelector('.tap-target');
    var instance = M.TapTarget.init(elem);
    if (instance.isOpen) {
        return instance.destroy();
    }
    return instance.open();
}

document.addEventListener('DOMContentLoaded', toggleTarget);

saveBtn.addEventListener("click", function(){
    var favLi = document.createElement("li");
    var storeObj = JSON.parse(localStorage.getItem("mealRecipe"));
    favLi.textContent = storeObj.name;
    favUl.appendChild(favLi);
});