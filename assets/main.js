$.ajax({url:'https://api.ipgeolocation.io/ipgeo?apiKey=c182e885b4554c5fadb3366dbc198f3d&ip=1.1.1.1&fields=city', method: 'GET'}).then(function(resp){
    console.log(resp)
    console.log(resp.city)
})