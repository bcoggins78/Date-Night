 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBCOEcil59Vk5s0JYgBoMr2EZoT4v7QjEc",
    authDomain: "class-ca05f.firebaseapp.com",
    databaseURL: "https://class-ca05f.firebaseio.com",
    projectId: "class-ca05f",
    storageBucket: "class-ca05f.appspot.com",
    messagingSenderId: "405893305722"
  };
  firebase.initializeApp(config);
$('.top-tab').on('click', function(){
    $('.container').append('<');

   
})
$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });


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
    // var apikey = "7byjtqn68yzm6ecsjfmcy9q3";
    //  var apikey = "7byjtqn68yzm6ecsjfmcy9q3";
    // var apikey = "sdpzqr2egk9fyp2ct7jz879v";
    var apikey = "dxfsm4dzuvd4wxbbwu2f4gze"; //David

    var baseUrl = "https://data.tmsapi.com/v1.1";
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

    $(".card-header").append('<h1>Found ' + data.length + ' movies showing within ' + distance + ' miles of ' + zipCode+':</h1>');
    var movies = data.hits;
    $.each(data, function(index, movie) {
      console.log(movie)
      var url =  "https://www.omdbapi.com/?t=" + movie.title + "&y=&plot=short&apikey=trilogy"
      $.ajax({url: url, method: 'GET'} ).then(function(resp){
        console.log(resp)
        if (resp.Title === movie.title){
          var tile = $('<div>').addClass('col-lg-2 tile').append($('<img>').attr({src: [resp.Poster], class: 'poster', type: 'button', 'data-toggle': 'modal', 'data-target': '#movieShowtimeModal'}))
          $("#results-view").append(tile);
        }
      })
    });
    };

    
$(document).ready(function() {
    $('.poster').hover(function() {	    
    $(this).siblings('.poster').css('z-index', 10);
    $(this).css('z-index', 99);
    })
  })
/////// still working on this animation //////////         
/*$(document).on('mouseover','.poster',function(){
  console.log("animate")
  console.log($(this))
  $(this).animate({width: 300}, 2000)
})
$(document).on('mouseleave','.poster', function(){
    $(this).animate({width: 148 }, 2000)
})
*/
$(document).on("click", "#find-theater", runToday);
$(document).on("click", "#find-theater", runMovies);
$(document).on("click", "#find-restaurant", runZomato);


