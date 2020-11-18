var weatherAPIKey = "53a05f277b87c434c7782ec6e511d548";
var cityList = $("#cityList");
var forecastDisplay = $("#forecast");
var userCity = "Austin";
var cityFore

function findCity(city) {
    console.log(city)
    var searchInput = document.getElementById("searchInput")
    console.log(userCity)
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${weatherAPIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        cityFore = (response)
    });


    forecastDisplay.empty();
    var curDay = moment().format("YYYY-MM-DD") + " 12:00:00";
    for (var i = 1; i < 6; i++) {
        var targetDay = moment(curDay).add((i), 'd')
        targetDay = moment(targetDay).format("YYYY-MM-DD");
        targetDay = moment(targetDay).format("DD/MM/YYYY")
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
        console.log(userCity)
    if ($(this).attr("id") == "searchButton") {

        cityButton(userCity);
    }
    else {
        userCity = $(this).text();
    }
    $("#searchInput").val("");
    localStorage.setItem("searchedCity", userCity);
    findCity(userCity);
});

$(document).ready(function () {
    userCity = localStorage.getItem("searchedCity", userCity) || "";
    if (userCity != "") {
        cityButton(userCity);
        findCity(userCity);
    }
})