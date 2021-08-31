var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php" 
var 


fetch (randomDrink)
    .then(function(response){
        return response.JSON();
    })
    .then (function(data){

    })