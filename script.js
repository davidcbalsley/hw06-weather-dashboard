$(document).ready(function() {

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

    function showCurrentWeatherCondiditons(cityName, currentWeatherResponse) {
        var currentTemp = "";       // The current temperature
        var currentHumidity = "";   // The current humidity
        var currentWindSpeed = "";  // The current wind speed

        console.log(currentWeatherResponse); // debug

        // Clear any current weather conditions
        $("#current-temperature-result").empty();

        // Get current weather conditions from response, copy to local variables
        currentTemp = currentWeatherResponse.main.temp;
        currentTemp = currentTemp.toFixed(1); // Show just one decimal point for temperature
        currentHumidity = currentWeatherResponse.main.humidity;
        currentWindSpeed = currentWeatherResponse.wind.speed;
        currentWindSpeed = currentWindSpeed.toFixed(1); // Show just one decimal point for wind speed

        // Create a div for the city name, date, and condition icon
        var cityNameDiv = $("<div>");
        cityNameDiv.text(cityName);

        // Create a div for the current temperature
        var currentTempDiv = $("<div>");
        currentTempDiv.text("Temperature: " + currentTemp + " °F");

        // Create a div for the current humdity
        var currentHumidityDiv = $("<div>");
        currentHumidityDiv.text("Humidity: " + currentHumidity + "%");

        // Create a div for the current wind speed
        var currentWindSpeedDiv = $("<div>");
        currentWindSpeedDiv.text("Wind Speed: " + currentWindSpeed + " MPH");


        $("#current-temperature-result").append(cityNameDiv, currentTempDiv, currentHumidityDiv, currentWindSpeedDiv);
    }

    // For the given city name, get either the current weather conditions
    // or the 5-day forecast and return the response
    function getCurrentOrFiveDayWeather(cityName, currentOrFiveDay) {
        var queryURL = "";          // The query to pass to OpenWeeather

        if (cityName !== null) {
            if (currentOrFiveDay === "current") {
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
                    showCurrentWeatherCondiditons(cityName, response);
                });
            }
        }
    }

    // Button listener for search magnifying glass button
    $("#city-search").on("click", function () {
        var cityNameFromSearchButton = "";      // The namne of the city

        // Get the city name from the search text box
        cityNameFromSearchButton = $("input[aria-label='city-input']").val();

        // If the user entered a city in the search text box, get that city's current and 5-day weather
        if (cityNameFromSearchButton) {  
            getCurrentOrFiveDayWeather(cityNameFromSearchButton, "current");
        }
    });
});