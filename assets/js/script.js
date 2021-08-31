var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php" 
var randomMeal = "www.themealdb.com/api/json/v1/1/random.php"
var selectElement = document.querySelector('select');

selectElement.addEventListener('change', (event) => {
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