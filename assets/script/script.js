$(document).ready(function() {

    var maxDaysInForecast = 5;   // The 

    // Pseudocode!

    /* When a user enters a city into the search box and clicks the search button, or when
    a user clicks any city in the city history, get that city's weather information and
    display both the current conditions and the 5-day forecast. If the user searched for a 
    new city, add it to the search history. */

    // More detail!
    // When user clicks on the search button:
    // - Check that user has entered text for name of city
    // - If user has entered text for name of city, grab it
    // - Form queryURL string using city name
    // - Do AJAX call to get current weather conditions
    // - Copy values from response to local variables
    // - Use lon and lat to search for UV value
    // - Display the city name and date
    // - Display the current weather conditions
    // - Do AJAX all to get 5-day forecast
    // - Parse weather conditions for 5 days, display them
    // - If city name is new --
    // -- Create button for new city
    // -- Add it to display
    // -- Store new city name in local storage

    // When user clicks on city button --
    // - All of the above, except we don't need to create a new button
    // - Maybe move new city to top of city list

    // On page load
    // - Load cities from local storage, create buttons for them, display them

    // What to re-use
    // - Building query URL, getting either current or 5-day forecast
    // - Displaying current forecast
    // - Displaying 5-day forecast

    // For a given OpenWeather condition code, return the URL for the corresponding weather icon
    /*
    function getWeatherIconURL (conditionCode) {
        // console.log("conditionCode = " + conditionCode); // debug
        var iconNumber = "";    // The number for the icon on OpenWeather
        var timeOfDay = null;   // The hour of the day, in 24-hour format
        var dayNightCode = "";  // "d" or "n", for day or night

        conditionCode = parseInt(conditionCode);

        // Get the icon code, based on the condition code
        if ((conditionCode >= 200) && (conditionCode < 300)) {  // Thunderstorm
            iconNumber = "11";
        } else if ((conditionCode >= 300) && (conditionCode < 400)) {  // Drizzle
            iconNumber = "09";
        } else if ((conditionCode >= 500) && (conditionCode <= 504)) {  // Rain
            iconNumber = "10";
        } else if (conditionCode === 511) {   // Freezing rain
            iconNumber = "13";
        } else if ((conditionCode >= 520) && (conditionCode <= 531)) {  // Rain
            iconNumber = "09";
        } else if ((conditionCode >= 600) && (conditionCode < 700)) {  // Snow
            iconNumber = "13";
        } else if ((conditionCode >= 700) && (conditionCode < 800)) {  // Atmosphere
            iconNumber = "50";
        } else if (conditionCode === 800) {
            iconNumber = "01";
        } else if (conditionCode === 801) {
            iconNumber = "02";
        } else if (conditionCode === 802) {
            iconNumber = "03";
        } else if ((conditionCode === 803) || (conditionCode === 804)) {
            iconNumber = "04";
        }
        
        // Get the hour of the day
        timeOfDay = moment().format("H");
        timeOfDay = parseInt(timeOfDay);

        if ((timeOfDay < 6) || (timeOfDay > 21)) {
            // Nighttime
            dayNightCode = "n";
        } else {
            // Daytime
            dayNightCode = "d";
        }

        if (iconNumber && dayNightCode) {
            return "http://openweathermap.org/img/wn/" + iconNumber + dayNightCode + ".png";
        } else {
            return null;
        }
    }
    */

    // Display the current weather conditions
    // function showCurrentWeatherCondiditons(cityName, currentWeatherResponse, currentWeatherUVResponse) {
    function showCurrentWeatherCondiditons(currentWeatherResponse, currentWeatherUVResponse) {
        var cityName = "";              // The name of the city
        var dateString = "";            // The current date, in M/D/YYYY format
        var currentWeatherIconURL = ""; // The URL for the icon that corresponds to the current weather
        // var currentTemp = "";           // The current temperature
        // var currentHumidity = "";       // The current humidity
        // var currentWindSpeed = "";      // The current wind speed
        // var currentUVIndex = "";        // The current UV index

        console.log(currentWeatherResponse); // debug

        // Clear any current weather conditions
        $("#current-temperature-result").empty();

        // Get the city name, date, and weather icon for the top of the page
        cityName = currentWeatherResponse.name;

        // Make current date string
        // dateString = moment().format("M") + "/" + moment().format("D") + "/" + moment().format("YYYY");
        dateString = moment().format("M/D/YYYY");

        // Get the URL for the icon that corresponds to the current weather
        /*
        if (currentWeatherResponse && currentWeatherResponse.weather.length > 0) {
            currentWeatherIconURL = getWeatherIconURL(currentWeatherResponse.weather[0].id);
        }*/
        if ((currentWeatherResponse.weather) && (currentWeatherResponse.weather.length > 0)) {
            currentWeatherIconURL = "http://openweathermap.org/img/wn/" + currentWeatherResponse.weather[0].icon + ".png";
        }

        // console.log("currentWeatherIconURL = " + currentWeatherIconURL); // debug

        // Create a div for the city name, date, and condition icon
        // var cityNameDiv = $("<div>");
        var cityNameDateWeatherSpan = $("<span>");
        cityNameDateWeatherSpan.text(cityName + " (" + dateString + ") ");

        if (currentWeatherIconURL) {
            var currentWeatherIconImg = $("<img>");
            currentWeatherIconImg.attr("src", currentWeatherIconURL);
            cityNameDateWeatherSpan.append(currentWeatherIconImg);
        }
        // cityNameDiv.append(cityNameDateWeatherSpan);

        $("#current-temperature-result").append(cityNameDateWeatherSpan);

        // Add temp
        $("#current-temperature-result").append("<p>Temperature: " + currentWeatherResponse.main.temp.toFixed(1) + " °F</p>");

        // Add humidity
        $("#current-temperature-result").append("<p>Humidity: " + currentWeatherResponse.main.humidity + "%</p>");

        // Add wind speed
        $("#current-temperature-result").append("<p>Wind Speed: " + currentWeatherResponse.wind.speed.toFixed(1) + " MPH</p>");

        // Add UV index
        $("#current-temperature-result").append("<p>UV Index: " + currentWeatherUVResponse.value + "</p");
        
        /*
        $("#current-temperature-result").append("<p>UV Index: ");
        var UVIndexSpan = $("<span>");
        $("#current-temperature-result").append(UVIndexSpan);
        $("#current-temperature-result").append("</p>");
        */

        /*


        // Get current weather conditions from response, copy to local variables
        currentTemp = currentWeatherResponse.main.temp;
        currentTemp = currentTemp.toFixed(1); // Show just one decimal point for temperature
        currentHumidity = currentWeatherResponse.main.humidity;
        currentWindSpeed = currentWeatherResponse.wind.speed;
        currentWindSpeed = currentWindSpeed.toFixed(1); // Show just one decimal point for wind speed
        currentUVIndex = currentWeatherUVResponse.value;

        // Create a div for the current temperature
        var currentTempDiv = $("<div>");
        currentTempDiv.text("Temperature: " + currentTemp + " °F");

        // Create a div for the current humdity
        var currentHumidityDiv = $("<div>");
        currentHumidityDiv.text("Humidity: " + currentHumidity + "%");

        // Create a div for the current wind speed
        var currentWindSpeedDiv = $("<div>");
        currentWindSpeedDiv.text("Wind Speed: " + currentWindSpeed + " MPH");

        // Create a div for the current UV index
        var currentUVIndexDiv = $("<div>");
        currentUVIndexDiv.text("UV Index: ");
        var currentUVIndexValueSpan = $("<span>");
        currentUVIndexValueSpan.text(currentUVIndex);
        currentUVIndexDiv.append(currentUVIndexValueSpan);

        // $("#current-temperature-result").append(cityNameDiv, currentTempDiv, currentHumidityDiv, currentWindSpeedDiv, currentUVIndexDiv);
    */
    }

    // For the given city name, get the current weather conditions
    function getCurrentWeather(cityName) {
        var queryURL = "";                  // The query to pass to OpenWeeather
        var currentWeatherResponse = null;  // The response for the current weather conditions
        var lon = "";                       // The city's longitude
        var lat = "";                       // The city's latitude
        var queryUVURL = "";                // The query to pass to OpenWeather for the UV
        var currentWeatherUVResponse = null;

        if (cityName !== null) {
            // Get the current weather conditions

            // Form the queryURL
            queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=16460027affaf1e3d6736c85f67318ba";
            
            // Make an AJAX call to get the current weather conditions 
            // from OpenWeather
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                // console.log(response); // debug
                currentWeatherResponse = response;

                // Get the city longitude and latitude
                lon = currentWeatherResponse.coord.lon;
                lat = currentWeatherResponse.coord.lat;

                queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=16460027affaf1e3d6736c85f67318ba&lat=" + lat + "&lon=" + lon;
                // console.log("queryUVURL = " + queryUVURL);

                $.ajax({
                    url: queryUVURL,
                    method: "GET"
                }).then(function(uVResponse) {
                    currentWeatherUVResponse = uVResponse;

                    // console.log(currentWeatherUVResponse);
                    // showCurrentWeatherCondiditons(cityName, currentWeatherResponse, currentWeatherUVResponse);
                    showCurrentWeatherCondiditons(currentWeatherResponse, currentWeatherUVResponse);
                });
            });
        }
    }

    //
    function showFiveDayForecast(forecastList) {
        var dateString = "";            // The current date, in M/D/YYYY format
        var currentWeatherIconURL = ""; // The URL for the icon that corresponds to the current weather

        if ((forecastList) && (forecastList.length > 0)) {
            // console.log("first date = " + moment().add(1, "days").format("M-D-YYYY")); // debug
            
            // Create label for five day-forecast
            fiveDayForecastLabelDiv = $("<h5>");
            fiveDayForecastLabelDiv.text("5-Day Forecast:");

            $("#five-day-forecast").append(fiveDayForecastLabelDiv);

            // Cycle through first maxDaysInForecast days, display info
            for (var i = 0; i < maxDaysInForecast; i++) {
                var newForecastDayDiv = $("<div>");

                // Make date string
                dateString = moment().add(i, "days").format("M-D-YYYY");
                newForecastDayDiv.append("<h6>" + dateString + "</h6>");

                // Add weather icon
                if ((forecastList[i].weather) && (forecastList[i].weather.length > 0)) {
                    currentWeatherIconURL = "http://openweathermap.org/img/wn/" + forecastList[i].weather[0].icon + ".png";
                    
                    var currentWeatherIconImg = $("<img>");
                    currentWeatherIconImg.attr("src", currentWeatherIconURL);
                    newForecastDayDiv.append(currentWeatherIconImg);
                }
        
                // Add temp
                newForecastDayDiv.append("<p>Temp: " + forecastList[i].main.temp + "  °F</p>");

                // Add humidity
                newForecastDayDiv.append("<p>Humidity: " + forecastList[i].main.humidity + "%</p>");

                $("#five-day-forecast").append(newForecastDayDiv);
            }
        }
    }

    // For the given city name, get the five-day forecast
    function getFiveDayForecast(cityName) {
        var queryURL = "";                  // The query to pass to OpenWeeather

        // Form the queryURL
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=16460027affaf1e3d6736c85f67318ba";
        
        // Make an AJAX call to get the five-day forecast from OpenWeatehr
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response); // debug
            showFiveDayForecast(response.list);
        });
    
    }

    // For a given city name --
    // - If the city does not already appear in local storage, then add it
    // - If the city appears in local storage, then rearrange local storage to 
    //   put it at the beginning/top of the list
    function updateLocalStorage(cityName) {
        var existingCityNames = []; // List of city names from local storage
        var updatedCityNames = [];  // Updated list of city names

        if (cityName) {
            // Get any existing city names from local storage
            existingCityNames = JSON.parse(localStorage.getItem("weather-city-name-history"));
            console.log("cityNames = " + existingCityNames); // debug

            // If there are cities in local storage, point updatedCityNames to array
            // of those objects
            if (existingCityNames) {
                updatedCityNames = existingCityNames;
            }


            // Create new entry for local storage
            var newCityNameForLocalStorage = {
                    name: cityName
            };

            updatedCityNames.unshift(newCityNameForLocalStorage); 
            // Use unshift to add value to beginning of array, so that most recently
            // searched city appears at top of list of buttons

            // Store the list of city names in local storage
            localStorage.setItem("weather-city-name-history", JSON.stringify(updatedCityNames)); 
        }
    }

    // Read list of cities from local storage and display buttons for them
    function updateCityButtons() {
        var cityNamesFromLocalStorage = [];    // List of city names from local storage

        $("#clickable-city-names").empty();

        cityNamesFromLocalStorage = JSON.parse(localStorage.getItem("weather-city-name-history"));

        if (cityNamesFromLocalStorage) {
            for (var i = 0; i < cityNamesFromLocalStorage.length; i++) {
                var newButton = $("<button>");
                newButton.addClass("clickable-city-name");
                newButton.text(cityNamesFromLocalStorage[i].name);
                $("#clickable-city-names").append(newButton);
            }
        }
    }

    // For a given city name, get the current weather and five-day forecast
    // and display them
    // Also, update the list of city buttons
    function getAndDisplayWeatherForCity(cityName) {
        if (cityName) {
            getCurrentWeather(cityName);
            getFiveDayForecast(cityName);
            updateLocalStorage(cityName);
            updateCityButtons();
        }
    }

    // Event listener for search magnifying glass button
    $("#city-search").on("click", function () {
        var cityNameFromSearchButton = "";      // The namne of the city

        // Get the city name from the search text box
        cityNameFromSearchButton = $("input[aria-label='city-input']").val().trim();

        // If the user entered a city in the search text box, get that city's current and 5-day weather
        if (cityNameFromSearchButton) {  
            /*
            getCurrentWeather(cityNameFromSearchButton);
            getFiveDayForecast(cityNameFromSearchButton);
            updateCityButtons(cityNameFromSearchButton);
            */
           getAndDisplayWeatherForCity(cityNameFromSearchButton);
        }
    });

    // Event listener for clickable city names
   $(document).on("click", ".clickable-city-name", function() {
       // console.log("Yuo clicked on a city name!");
        var cityNameFromClickableButton = "";

        // Get the city name from the clickable button
        cityNameFromClickableButton = $(this).text();
        // console.log("cityNameFromClickableButton = " + cityNameFromClickableButton);

        if (cityNameFromClickableButton) {
            getAndDisplayWeatherForCity(cityNameFromClickableButton);
        }
   });

   // 
    function init() {
        // Create clickable city buttons for cities in local storage
        updateCityButtons();
    }

    // On screen load
    init();
});



// to do
// - Load city list on startup
// - Store new cities
// - Check the return code on AJAX calls
// - Style the UV Index
// - Split out the UV Index function