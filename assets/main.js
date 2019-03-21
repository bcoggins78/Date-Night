/*//google-ajax
$.ajax({url:'https://api.ipgeolocation.io/ipgeo?apiKey=c182e885b4554c5fadb3366dbc198f3d&ip=1.1.1.1&fields=city', method: 'GET'}).then(function(resp){
    console.log(resp)
    console.log(resp.city)
    $('#location').text(resp.city)
}).then(function(response){
    
})
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
    });
}
//fdgsdfsdfsfsfcsd
        var restaurantsArray = response.restaurants
    for (i=0;i<howManyResults;i++){  
        var currentRestaurant = restaurantsArray[randNum].restaurant.name;
        var currentRestaurantLocal = restaurantsArray[randNum].restaurant.location.address;
        $("#results-view").text("Restaurant Name: " + currentRestaurant);
        $("#results-view").append("<br>");
        $("#results-view").append("Address: " + currentRestaurantLocal);
        $("#results-view").append("<br></br>");
};

$(document).on("click", "#find-theater", runZomato);
*/

function initMap(){
    var location= {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById("map"),{
        zoom: 4, 
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    })
}