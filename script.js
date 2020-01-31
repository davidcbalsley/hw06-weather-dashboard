$("#city-search").on("click", function () {
    var queryURL ="";
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