// var howManyResults = 50;


function runZomato() {
    event.preventDefault();
    var randNum = Math.floor(Math.random() * 20);
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
    // for (i=0;i<howManyResults;i++){  
        var currentRestaurant = restaurantsArray[randNum].restaurant.name;
        var currentRestaurantLocal = restaurantsArray[randNum].restaurant.location.address;
        $("#results-view").text("Restaurant Name: " + currentRestaurant);
        $("#results-view").append("<br>");
        $("#results-view").append("Address: " + currentRestaurantLocal);
        $("#results-view").append("<br></br>");
})};

$(document).on("click", "#find-theater", runZomato);
