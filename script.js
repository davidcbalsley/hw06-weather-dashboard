$(document.readyState(function() {

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

    // Button listener for search magnifying glass button
    $("#city-search").on("click", function () {
        var queryURL = "";
        var cityName = "";
        // console.log("City input = " + $("input[aria-label='city-input']").val());

        cityName = $("input[aria-label='city-input']").val();

        // queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY";

        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=16460027affaf1e3d6736c85f67318ba";
        // console.log("queryURL = " + queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var currentTemp = response.main.temp;
            var currentHumidity = response.main.humidity;

            var currentTempDiv = $("<div>");
            currentTempDiv.text("Temperature: " + currentTemp + "F");

            $("#current-temperature-result").append(currentTempDiv);
  
        });
    })

});