let coordinates = {}

$(document).ready(function(){
    get_coordinates()
    get_weather()
})

function get_coordinates(){
    let search_params = new URLSearchParams(window.location.search);

    if(search_params.has("source") && search_params.has("destination")){
        let source = search_params.get("source");
        let destination = search_params.get("destination");

        coordinates.source_lat = source.split(";")[0];
        coordinates.source_lon = source.split(";")[1];

        coordinates.destination_lat = destination.split(";")[0];
        coordinates.destination_lon = destination.split(";")[1];

        console.log(coordinates);

    }else{
        alert("cooredinates not selected")
        window.history.back()
    }
}

function get_weather(){
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=94212e971d0ca977303f8ae892224bbd`,
        type:"get",
        success:function(response){
            let name = response.name;
            let weather = response.weather[0].main;
            $("#scene_container").append(
             `
                <a-entity gps-entity-place="latitude:${coordinates.source_lon};longitude:${coordinates.source_lat}">
                    <a-entity>
                       <a-plane height="100" width="100" rotation="-90 0 0" text=font:"monoid",color: "black",width: 2,align: "left",value:"Weather is ${weather} of ${name}"></a-plane>
                    </a-entity>
                </a-entity>
             `
            )
        }
    })
}

// api kye = 94212e971d0ca977303f8ae892224bbd