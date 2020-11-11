var weatherAPIKey = "fbfaa11458e089514df68787fbf176ac";
var cityList = $("#cityList");
var forecastDisplay = $("#forecast");
var userCity = "";

function findCity(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}`;



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