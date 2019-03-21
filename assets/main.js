//google-ajax
$.ajax({url:'https://api.ipgeolocation.io/ipgeo?apiKey=c182e885b4554c5fadb3366dbc198f3d&ip=1.1.1.1&fields=city', method: 'GET'}).then(function(resp){
    console.log(resp)
    console.log(resp.city)
    $('#location').text(resp.city)
}).then(function(response){
    
})

function runZomato() {

    var latitude = "35.791470"
    var longitude = "-78.781143";
    var radius = "5000M"
    var queryURL = "https://developers.zomato.com/api/v2.1/search?" + "lat=" + latitude + "&lon=" + longitude + "&radius=" + radius;
    

    $.ajax({
    url: queryURL,
    method: "GET",
    header: {'user-key' : '930bc5c593df51586e7bff08f89be982'}
    }).then(function(response) {
        console.log(JSON.stringify(response))
    });
}
//fdgsdfsdfsfsfcsd
