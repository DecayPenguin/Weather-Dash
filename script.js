var weatherAPIKey = "53a05f277b87c434c7782ec6e511d548";
var cityList = $("#cityList");
var forecastDisplay = $("#forecast");
var userCity;
var cityFore;

var cityHistory = [];


function findCity(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${weatherAPIKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //Displays for Temperature
      var temp = response.main.temp
      
      console.log(typeof temp)


     // $("#temp").text()

      if(temp >= 50){
          $("#tempF").css("color", "green")
      }
      if(temp <= 49){
        $("#tempF").css("color", "blue")
    }
        $("#tempF").text(`Temp-F : ${temp} °`);
        //Displays for Humidity
       // console.log(response.main.humidity)
        $("#humid").text(`Humidity : ${response.main.humidity} %`);
        //Displays for Wind Speed 
      //  console.log(response.wind.speed)
        $("#wind").text(`Wind : ${response.wind.speed} MPH`);
        // UV Index
      //  console.log(response.main)
        $("#uvIndex").text(`UV Index : ${response.main} `);

        cityFore = (response)

        var uvQuery = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${weatherAPIKey}`;
        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function(data){
            console.log(data, "response")
            $("#uvIndex").text(`UV Index : ${data.value} `);
            if(data.value >= 6){
                $("#uvIndex").text("color", "red")
            }
            if(data.value <= 5 ){
                $("#uvIndex").number("color", "green")
            }
        })

        
    });

    forecastDisplay.empty();
    var curDay = moment().format("DD-MM-YYYY");
    console.log(curDay, 'CURDAY')
    for (var i = 1; i < 6; i++) {
        //var targetDay = moment(curDay).add((i), 'd')
        //targetDay = moment(targetDay).format("YYYY-MM-DD");
        var targetDay = moment(curDay,"DD-MM-YYYY").add((i), 'days')
        console.log(targetDay, "targetDay")
        // iconCode = cityFore.daily[i].weather[0].icon;
        // altIcon = cityFore.daily[i].weather[0].description;
        // iconURL = `http://openweathermap.org/img/w/${iconCode}.png`
        var element = $(`
                        <div class="col">
                            <div class="card bg-primary text-white">
                                <div class="card-body">
                                    <h5>${targetDay}</h5>
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>                            
                        `);
        forecastDisplay.append(element);
    }
}

{/* <img src="${iconURL}" alt="${altIcon}"></img> */}
{/* <p>Temp: ${cityFore.daily[i].temp.day} F</p> */}
{/* <p>Humidity: ${cityFore.daily[i].humidity} %</p> */}

function cityButton(userCity) {
    var cityBtn = `<button class="btn-block btn btn-primary">${userCity}</button>`;
    cityList.prepend(cityBtn);
}



$(document).on("click", "button", function () {
    userCity = $("#searchInput").val();
    cityHistory.push(userCity);
    console.log(userCity)

    $("#cityAndDay").text(userCity)
    // if ($(this).attr("id") == "searchButton") {

    //     cityButton(userCity);
    // }
    // else {
    //     userCity = $(this).text();
    // }
    localStorage.setItem("searchedCity", cityHistory);
    findCity(userCity);
});

$(document).ready(function () {


    userCity = localStorage.getItem("searchedCity", userCity) || "";
    if (userCity != "") {
        cityButton(userCity);
        findCity(userCity);
    }
})