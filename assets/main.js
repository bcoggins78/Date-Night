// var howManyResults = 50;
var inputdate = "";
var today = moment().format("YYYY-MM-DD");  
var distance = "";
function runToday() {
    inputdate = $("#date-input").val();
if (inputdate === ""){
    (inputdate = today);
}};

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
        $("#restaurant-view").text("Restaurant Name: " + currentRestaurant);
        $("#restaurant-view").append("<br>");
        $("#restaurant-view").append("Address: " + currentRestaurantLocal);
        $("#restaurant-view").append("<br></br>");
})};

function runMovies(){
    event.preventDefault();
    distance = $("#distance-input").val();
    if (distance === ""){
        distance = 5;
    }
    $("#results-view").text("");
        //  var apikey = "7byjtqn68yzm6ecsjfmcy9q3";
         var apikey = "sdpzqr2egk9fyp2ct7jz879v";
         var baseUrl = "http://data.tmsapi.com/v1.1";
         var showtimesUrl = baseUrl + '/movies/showings';
         var zipCode = $("#location-input").val();
         $.ajax({
            url: showtimesUrl,
                data: { startDate: inputdate,
                    zip: zipCode,
                    radius: distance,
                    jsonp: "dataHandler",
                    api_key: apikey
                   },          
            dataType: "jsonp",
           });
         };

         function dataHandler(data) {
            var zipCode = $("#location-input").val();
            // var apikey = "7byjtqn68yzm6ecsjfmcy9q3";
            var apikey = "sdpzqr2egk9fyp2ct7jz879v";

          $("#results-view").append('<h1>Found ' + data.length + ' movies showing within ' + distance + ' miles of ' + zipCode+':</h1>');
          var movies = data.hits;
          $.each(data, function(index, movie) {
            var movieData = '<button>';
            movieData += movie.title;
            if (movie.ratings) { movieData += ' (' + movie.ratings[0].code + ') </div>' };
            $("#results-view").append(movieData);
            $("#results-view").append('<br><br/>');
          });
         };

$(document).on("click", "#find-theater", runToday);
$(document).on("click", "#find-theater", runMovies);
$(document).on("click", "#find-restaurant", runZomato);

////////////////////////////MAP////////////////////////////////
var map,infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      