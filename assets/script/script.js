$(document).ready(function() {

    var maxDaysInForecast = 5;   // The number of days to display for the forecast

    // Display the current weather conditions
    function showCurrentWeatherCondiditons(currentWeatherResponse, currentWeatherUVResponse) {
        var cityName = "";              // The name of the city
        var dateString = "";            // The current date, in M/D/YYYY format
        var currentWeatherIconURL = ""; // The URL for the icon that corresponds to the current weather

        // Clear any current weather conditions
        $("#current-temperature-result").empty();

        // Get the city name, date, and weather icon for the top of the page
        cityName = currentWeatherResponse.name;

        // Make current date string
        dateString = moment().format("M/D/YYYY");

        // Get the URL for the icon that corresponds to the current weather
        if ((currentWeatherResponse.weather) && (currentWeatherResponse.weather.length > 0)) {
            currentWeatherIconURL = "http://openweathermap.org/img/wn/" + currentWeatherResponse.weather[0].icon + ".png";
        }

        // Create a div for the city name, date, and condition icon
        // var cityNameDiv = $("<div>");
        var cityNameDateWeatherSpan = $("<span>");
        cityNameDateWeatherSpan.text(cityName + " (" + dateString + ") ");

        if (currentWeatherIconURL) {
            var currentWeatherIconImg = $("<img>");
            currentWeatherIconImg.attr("src", currentWeatherIconURL);
            cityNameDateWeatherSpan.append(currentWeatherIconImg);
        }

        $("#current-temperature-result").append(cityNameDateWeatherSpan);

        // Add temp
        $("#current-temperature-result").append("<p>Temperature: " + currentWeatherResponse.main.temp.toFixed(1) + " °F</p>");

        // Add humidity
        $("#current-temperature-result").append("<p>Humidity: " + currentWeatherResponse.main.humidity + "%</p>");

        // Add wind speed
        $("#current-temperature-result").append("<p>Wind Speed: " + currentWeatherResponse.wind.speed.toFixed(1) + " MPH</p>");

        // Add UV index
        $("#current-temperature-result").append("<p>UV Index: " + currentWeatherUVResponse.value + "</p");
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
                currentWeatherResponse = response;

                // Get the city longitude and latitude
                lon = currentWeatherResponse.coord.lon;
                lat = currentWeatherResponse.coord.lat;

                queryUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=16460027affaf1e3d6736c85f67318ba&lat=" + lat + "&lon=" + lon;

                $.ajax({
                    url: queryUVURL,
                    method: "GET"
                }).then(function(uVResponse) {
                    currentWeatherUVResponse = uVResponse;

                    showCurrentWeatherCondiditons(currentWeatherResponse, currentWeatherUVResponse);
                });
            });
        }
    }

    // Display the five-day forecast
    function showFiveDayForecast(forecastList) {
        var dateString = "";            // The current date, in M/D/YYYY format
        var currentWeatherIconURL = ""; // The URL for the icon that corresponds to the current weather

        if ((forecastList) && (forecastList.length > 0)) {
            
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

            // If there are cities in local storage, point updatedCityNames to array
            // of those objects
            if (existingCityNames) {

                var indexForNewCity = existingCityNames.findIndex(function(item) {
                        return item.name === cityName;
                })

                if (indexForNewCity >= 0) {
                    // Put the most recently searched city in first
                    updatedCityNames.push(existingCityNames[indexForNewCity]);

                    // Copy the elements from existingCityNames that precede the found object into updatedCityNames
                    for (var i = 0; i < indexForNewCity; i++) {
                        updatedCityNames.push(existingCityNames[i]);
                    }

                    // Copy the elements from existingCityNames that follow the found object into updatedCityNames
                    for (var j = indexForNewCity + 1; j < existingCityNames.length; j++) {
                        updatedCityNames.push(existingCityNames[j]);
                    }

                } else {
                    updatedCityNames = existingCityNames;

                    // Create new entry for local storage
                    var newCityNameForLocalStorage = {
                        name: cityName
                    };

                    updatedCityNames.unshift(newCityNameForLocalStorage); 
                    // Use unshift to add value to beginning of array, so that most recently
                    // searched city appears at top of list of buttons
                }
            } else {
                // Nothing in local storage -- add new city to udpatedCityNames
                // Create new entry for local storage
                var newCityNameForLocalStorage = {
                    name: cityName
                };

                updatedCityNames.push(newCityNameForLocalStorage);
            }

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
           getAndDisplayWeatherForCity(cityNameFromSearchButton);
        }
    });

    // Event listener for clickable city names
   $(document).on("click", ".clickable-city-name", function() {
        var cityNameFromClickableButton = "";

        // Get the city name from the clickable button
        cityNameFromClickableButton = $(this).text();

        if (cityNameFromClickableButton) {
            getAndDisplayWeatherForCity(cityNameFromClickableButton);
        }
   });

   // Initialize the screen
    function init() {
        // Create clickable city buttons for cities in local storage
        updateCityButtons();
    }

    // On screen load
    init();
});



// to do
// - Check the return code on AJAX calls
// - Style the UV Index
// - Split out the UV Index function
// - Style everything