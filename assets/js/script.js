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
var cardEl = document.querySelector(".cardEl");
var drinkUl = document.getElementById("drinkUl");
var drinkDiv = document.querySelector(".drinkDiv");
var mealDiv = document.querySelector(".mealDiv");
var mealHead = document.getElementById("mealHead");
var drinkHead = document.getElementById("drinkHead");

var favItems = JSON.parse(localStorage.getItem("favorites")) || [];

selectElement.addEventListener('change', (event) => {
    showEl.classList.remove("hide");
    popUp.classList.add("hide");
    if (event.target.value === "1") {
        event.target.value = "";
        fetch(randomMeal)
            .then(function (response) {
                return response.json();
            })
            .then(buildMeal)

    } else {
        event.target.value = "";
        fetch(randomDrink)
            .then(function (response) {
                return response.json();
            })
            .then(buildDrink)
    };
}


);

function buildMeal(data) {
    cardEl.setAttribute("data-id", "meal")
    var meal = data.meals[0];
    var mealData = {
        name: '',
        instructions: '',
        ingredients: [],
        source: '',
        image: '',
        id: ''
    };
    for (var prop in meal) {
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
        if (prop === "idMeal") {
            mealData.id = meal[prop];
        }
    }


    imgEl.src = mealData.image;
    nameEl.textContent = mealData.name;


    ulEl.innerHTML = "";

    for (var i = 0; i < mealData.ingredients.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = mealData.ingredients[i];
        ulEl.appendChild(liEl);
    }

    instructionsEl.textContent = mealData.instructions;

    h6El.textContent = "Link to full recipe: ";
    sourceEl.textContent = mealData.source;
    sourceEl.href = mealData.source;

}

function buildDrink(data) {
    cardEl.setAttribute("data-id", "drink");
    var drink = data.drinks[0];
    var drinkData = {
        name: '',
        instructions: '',
        ingredients: [],
        image: ''
    };
    for (var prop in drink) {
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
    imgEl.src = drinkData.image;

    nameEl.textContent = drinkData.name;

    ulEl.innerHTML = "";

    for (var i = 0; i < drinkData.ingredients.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = drinkData.ingredients[i];
        ulEl.appendChild(liEl);
    }

    instructionsEl.textContent = drinkData.instructions;

    sourceEl.textContent = "";
    sourceEl.href = "";
    h6El.textContent = "";


}

var toggleTarget = function () {
    var elem = document.querySelector('.tap-target');
    var instance = M.TapTarget.init(elem);
    if (instance.isOpen) {
        return instance.destroy();
    }
    return instance.open();
}

document.addEventListener('DOMContentLoaded', toggleTarget);

saveBtn.addEventListener("click", function (event) {

    var ingredientsArr = []

    // Stores ingredients into ingredientsArr
    for (var i = 0; i < ulEl.childNodes.length; i++) {
        var ingredient = ulEl.childNodes[i].textContent;
        if (!ingredientsArr.includes(ingredient)) {
            ingredientsArr.push(ingredient);
        }
    }
    // Object containing all drink or meal info
    var dataObject = {
        name: nameEl.textContent,
        instructions: instructionsEl.textContent,
        ingredients: ingredientsArr,
        image: imgEl.getAttribute("src"),
        type: event.target.closest(".card").dataset.id
    }
    
    favItems.push(dataObject)
    localStorage.setItem("favorites", JSON.stringify(favItems));

    if (cardEl.getAttribute("data-id") === "meal") {
        mealHead.textContent = "Favorite Meals";
        var mealLi = document.createElement("li");
        mealLi.setAttribute("class", "mealLi")
        mealLi.textContent = dataObject.name;
        mealUl.appendChild(mealLi);

    } else {
        drinkHead.textContent = "Favorite Drinks";
        var drinkLi = document.createElement("li");
        drinkLi.setAttribute("class", "drinkLi")
        drinkLi.textContent = dataObject.name;
        drinkUl.appendChild(drinkLi);
    }
});

drinkUl.addEventListener("click", function (event) {
    var storeObj = JSON.parse(localStorage.getItem(event.target.textContent));

    imgEl.src = storeObj.image;
    nameEl.textContent = storeObj.name;
    ulEl.innerHTML = "";

    for (var i = 0; i < storeObj.ingredients.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = storeObj.ingredients[i];
        ulEl.appendChild(liEl);
    }

    instructionsEl.textContent = storeObj.instructions;
    sourceEl.textContent = "";
    sourceEl.href = "";
    h6El.textContent = "";
})

mealUl.addEventListener("click", function (event) {
    var storeObj = JSON.parse(localStorage.getItem(event.target.textContent));

    imgEl.src = storeObj.image;
    nameEl.textContent = storeObj.name;
    ulEl.innerHTML = "";

    for (var i = 0; i < storeObj.ingredients.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = storeObj.ingredients[i];
        ulEl.appendChild(liEl);
    }

    instructionsEl.textContent = storeObj.instructions;
    sourceEl.textContent = "";
    sourceEl.href = "";
    h6El.textContent = "";
})
