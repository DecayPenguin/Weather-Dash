var weatherAPIKey = "4761287cde43332409ca6af258893d4f";
var cityList = $("#cityList");
var forecastDisplay = $("#forecast");
var userCity = "";

function findCity(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (city) {
        queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${weatherAPIKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (cityFore) {
            var iconCode = city.weather[0].icon;
            var altIcon = city.weather[0].description;
            var iconURL = `http://openweathermap.org/img/w/${iconCode}.png`
            var element = $(`
                    <h1>${city.name + moment().format(" (DD/MM/YY)")}
                    <img src="${iconURL}" alt="${altIcon}"></h1>
                    <p>Temperature: ${city.main.temp}</p>
                    <p>Humidity: ${city.main.humidity} F</p>            
                    <p>Wind Speed: ${city.wind.speed} MPH</p>
                `);
            var uVI = cityFore.daily[0].uvi
            if (uVI < 2) {
                var uvScale = $("<span class='badge uv-Low'>");
            }
            else if (uVI < 5) {
                var uvScale = $("<span class='badge uv-Mod'>");
            }
            else if (uVI < 7) {
                var uvScale = $("<span class='badge badge-warning'>");
            }
            else if (uVI < 10) {
                var uvScale = $("<span class='badge badge-danger'>");
            }
            else {
                var uvScale = $("<span class='badge uv-Ext'>");
            }
            $("#mainDisplay").empty();
            $("#mainDisplay").append(element);
            $("#mainDisplay").append($("<p id='uvDisplay'>").text("UV Index: "));
            $("#uvDisplay").append(uvScale.text(uVI));

            forecastDisplay.empty();
            var curDay = moment().format("YYYY-MM-DD") + " 12:00:00";
            for (var i = 1; i < 6; i++) {
                var targetDay = moment(curDay).add((i), 'd')
                targetDay = moment(targetDay).format("YYYY-MM-DD");
                targetDay = moment(targetDay).format("DD/MM/YYYY")
                iconCode = cityFore.daily[i].weather[0].icon;
                altIcon = cityFore.daily[i].weather[0].description;
                iconURL = `http://openweathermap.org/img/w/${iconCode}.png`
                var element = $(`
                        <div class="col">
                            <div class="card bg-primary text-white">
                                <div class="card-body">
                                    <h5>${targetDay}</h5>
                                    <img src="${iconURL}" alt="${altIcon}">
                                    <p>Temp: ${cityFore.daily[i].temp.day} F</p>
                                    <p>Humidity: ${cityFore.daily[i].humidity} %</p>
                                </div>
                            </div>
                        </div>                            
                        `);
                forecastDisplay.append(element);
            }
        });
    });
}

function cityButton(userCity) {
    var cityBtn = `<button class="btn-block btn btn-primary">${userCity}</button>`;
    cityList.prepend(cityBtn);
}

$(document).on("click", "button", function () {

    if ($(this).attr("id") == "searchButton") {

        userCity = $("#searchInput").val();
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