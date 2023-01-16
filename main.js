let latitude,longitude,destination;

$(document).ready(function(){
    alert("please turn on the device location");
    initGeolocate()
})

function initGeolocate(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success);
    }else{
        alert("sorry")
    }
}

$(function(){
    $("#navigate-button").click(function(){
        window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`;
    })
})

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // initializing map box
    mapboxgl.accessToken = "pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA";

    var map = new mapboxgl.Map({
        container:"map",
        style:"mapbox://styles/mapbox/streets-v11",
        center:[longitude,latitude],
        zoom:16
    })

    var img1 = document.querySelector("#amber")
    var img2 = document.querySelector("#gate")
    var img3 = document.querySelector("#victoria")
    var img4 = document.querySelector("#lotus")

    // amber
    var marker1 = new mapboxgl.Marker({
        element:img1
    })
    .setLngLat([75.85133,26.98547])
    .addTo(map)

    // gate
    var marker2 = new mapboxgl.Marker({
        element:img2
    })
    .setLngLat([28.6129, 77.2295])
    .addTo(map)

    // victoria memorial
    var marker3 = new mapboxgl.Marker({
        element:img3
    })
    .setLngLat([22.5448, 88.3426])
    .addTo(map)

    // lotus temple
    var marker4 = new mapboxgl.Marker({
        element:img4
    })
    .setLngLat([28.5535, 77.2588])
    .addTo(map)


    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }).on("result",function(e){
            destination = e.result.center
            console.log(destination)
            console.log(destination[0])
            console.log(destination[1])
        })
    );
}
