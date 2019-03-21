var howManyResults = 5;


function runZomato() {

    var latitude = "35.791470"
    var longitude = "-78.781143";
    var radius = "5000M"
    var queryURL = "https://developers.zomato.com/api/v2.1/search?" + "lat=" + latitude + "&lon=" + longitude + "&radius=" + radius;
    

    $.ajax({
    url: queryURL,
    method: "GET",
    headers: {'user-key' : '930bc5c593df51586e7bff08f89be982'}
    }).then(function(response) {
        console.log(JSON.stringify(response))
        restaurantsArray = response.restaurants
    for (i=0;i<howManyResults;i++){  
        var currentRestaurant = restaurantsArray[i].restaurant.name
        $("#results-view").append("Restaurant Name: " + currentRestaurant);
        $("#results-view").append("<br></br>");
}})};
runZomato();
