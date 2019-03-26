$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBxYu0ZTOj6wX-e7tjlsMFIIQKNDzGQOMw",
  authDomain: "datenight-1d83d.firebaseapp.com",
  databaseURL: "https://datenight-1d83d.firebaseio.com",
  projectId: "datenight-1d83d",
  storageBucket: "datenight-1d83d.appspot.com",
  messagingSenderId: "934240292130"
};
firebase.initializeApp(config);


var database = firebase.database();

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
    var length = 2;
    var trimmedDistance = distance.substring(0, length);
    distance = trimmedDistance;
    if (distance === ""){
        distance = 5;
    }
    $("#results-view").text("");
    // var apikey = "7byjtqn68yzm6ecsjfmcy9q3";
    //  var apikey = "7byjtqn68yzm6ecsjfmcy9q3";
    var apikey = "sdpzqr2egk9fyp2ct7jz879v";
    // var apikey = "dxfsm4dzuvd4wxbbwu2f4gze"; //David

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
      //var apikey = "sdpzqr2egk9fyp2ct7jz879v";

    $(".card-header").text('Found ' + data.length + ' movies showing within ' + distance + ' miles of ' + zipCode+':');
    var movies = data.hits;
    $.each(data, function(index, movie) {
      console.log(movie)
      
      var url =  "https://www.omdbapi.com/?t=" + movie.title + "&y=&plot=short&apikey=trilogy"
      $.ajax({url: url, method: 'GET'} ).then(function(resp){
        // console.log(resp)
        if (resp.Title === movie.title){
          var tile = $('<div>').addClass('col-lg-2 tile').append($('<img>').attr({src: [resp.Poster], class: 'poster', type: 'button', 'data-toggle': 'modal', 'data-target': '#movieShowtimeModal','data-movie': JSON.stringify(movie)}))
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

function fillModal(){
  var theaters = []
  var data = JSON.parse($(this).attr('data-movie'));
  console.log(data);
  var resultsSearchDay = moment(data.showtimes[0].dateTime, 'YYYY-MM-DDThh:mm').format('dddd, MMMM Do YYYY')
  $('#movieTable').empty()
  $('#movieDescrip').empty().append($('<h3>').text(data.title),$('<p>').text(data.longDescription))
  var row1 = $('<div>').addClass('row text-center').append($('<h6>').text(resultsSearchDay),$('<br><br>'));
  var row2 = $('<div>').addClass('row')
  for (var i=0;i<data.showtimes.length;i++){
    if (theaters.indexOf(data.showtimes[i].theatre.name) == -1)
      theaters.push(data.showtimes[i].theatre.name)
  }
  for (var i=0;i<theaters.length;i++){
    $('<table>').attr({'id':'id'+i, class: 'tableFloat table table-striped'}).append($('<tr>').append($('<th>').text(theaters[i]))).appendTo(row2);
  }
  $('#movieTable').append(row1,row2);
  for (var i=0;i<data.showtimes.length;i++) {
    var displayDate = moment(data.showtimes[i].dateTime, 'YYYY-MM-DDThh:mm').format('h:mm a')
    var id = "#id"+theaters.indexOf(data.showtimes[i].theatre.name)
    $(id).append($('<tr>').append($('<td>').text(displayDate)))
  }
}



  
function displayLogIn(){
  document.getElementById('loginPg').style.display = "block";
}
function displayRegisterForm(){
  document.getElementById('registerPg').style.display =  "block";
}
function displayMovieTable(){
  document.getElementById('movieCard').style.display = 'block';
}
function loginRegisterVisibility(){
  if (('loginPg').display = 'block'){
    ('registerPg').display = 'none'
  }
}
function loginRegisterClose(){
  document.getElementById('loginPg').style.display = "none";
  document.getElementById('registerPg').style.display =  "none";
}
function registerLoginVisibility(){
  if (('registerPg').display='block'){
    ('loginPg').display = 'none';
  }
}
loginRegisterVisibility()

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
$(document).on('click', '.close', loginRegisterClose)
$(document).on('click', '#registerBtn', displayRegisterForm)
$(document).on("click", "#find-theater", displayMovieTable);
$(document).on('click', '#loginBtn', displayLogIn )
$(document).on("click", ".poster", fillModal);
$(document).on("click", "#find-theater", runToday);
$(document).on("click", "#find-theater", runMovies);
$(document).on("click", "#find-restaurant", runZomato);


