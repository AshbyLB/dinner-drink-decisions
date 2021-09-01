var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var randomMeal = "www.themealdb.com/api/json/v1/1/random.php";
var selectElement = document.querySelector('select');
var showEl = document.querySelector(".showEl");


selectElement.addEventListener('change', (event) => {
    showEl.classList.remove("hide");
    console.log(event.target.value);
  if (event.target.value === 1) {
    fetch (randomMeal)
    .then(function(response){
        return response.JSON();
    })
    .then (function(data){

    })

    } else{
        fetch (randomDrink)
    .then(function(response){
        return response.JSON();
    })
    .then (function(data){

    })
    }
  
});

