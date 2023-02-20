
const apiKey = "29eb402017238a20350a0cedd7ecd2ac";
const history = JSON.parse(localStorage.getItem('history')) || [];
// TODO: Populate history list from local storage when page loads

$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const userInput = $('#search-input').val();
    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    // TODO: put the search value on the history list container

    // Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));

    // Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({ url: queryUrl })
        .then(function(response) {
            const lat = response[0].lat;
            const lon = response[0].lon;

            

            const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            // Call 5 day weather forecast API after we have city lat and lon value
            $.ajax({ url: weatherQueryUrl })
                .then(function(weatherResponse) {
                    // Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    console.log(weatherResponse);
                    showCurrentWeather(weatherList[0], userInput);

                    const weathers = [];
                    for (let i = 0; i < weatherList.length; i += 8) {
                        weathers.push(weatherList[i]);
                    }
                    showFiveDayWeather(weathers)
                    // weathers[0] will be today's weather
                    // weathers[1 - 4] will be 5 days forecast
                    // TODO: put today's weather in container for today's weather
                    // TODO: put 5 day's forecast weather in container for the 5 day forecast
                    // Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"
                });
        });
});

function showCurrentWeather(data, cityName){

    var currentWeatherHTML = `
    <div class="card">
        <div class="card-body">
        <h2>${cityName} (${data.dt_txt}) <img scr="https://openweathermap.org/img/w/${data.weather[0].icon}.png" /> </h2>
        <p>Temp: ${data.main.temp}</p>
        <p>Wind: ${data.wind.speed}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        </div>
    </div>
    `

    $("#today").html(currentWeatherHTML)
}

function showFiveDayWeather(data){
    var fiveDayHTML = ``

    for(var i =0; i < data.length; i++){
        var currentDay = data[i];

        fiveDayHTML += ``
    }

    $().html(fiveDayHTML)
}
//4.Put response in todays weather container for todays weather in HTML page

//5.Put 5 day forecast in container on HTML page
//6.Add input to local storage
//7.Populate history list from local storage when page loads
