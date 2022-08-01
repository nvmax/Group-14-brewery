// var modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var button = document.getElementById("button"); // Variable for button
var city = city;
//https://api.openbrewerydb.org/
var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=";
//https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3
// var city = "minneapolis"
var endAPI = "&per_page=50";
// https://developer.myptv.com/Home.htm
geoapi = "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=";
apikey = "MDg3MGFhN2NhZGRjNDdiMGJiYjgxZTE0OTE4OTVhYTY6OTI2NzI5ZGEtNTRiMC00ZTBhLWFkYjEtNzk3YWNhNWE1ODdk";
var map;
const coordinates = {};

// function to clear out class.input field in html when clicked
$(".input").click(function () {
  $(this).val("");
});

// span.onclick function
span.onclick = function () {
  modal.style.display = "none";
  // reload getcity function
  location.reload();
};

// function for modal
function modalError() {
  modal.style.display = "block";
}
// function for on window click
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    // reload page
    location.reload();
  }
};

// keyboard event when enter key is pressed input sends value to getcity and savecity functions
$("#search-input").keypress(function (event) {
  if (event.which == 13) {
    // if #search-input is empty, send error message to modal
    if ($("#search-input").val() === "") {
      // append paragraph id="error" in html
      $("#error").append("<p>Please enter a city</p>");
      // turns map off
      map.off();
      // removes map
      map.remove();
      // calls modalError function
      modalError();
    }
    // else gets value from class=input on html
    else {
      var city = $("#search-input").val();
      saveCity(city);
      // calls getCity function
      getCity(city);
      // calls loadCities function 
      loadCities();
      // clears search-input field
      $("#search-input").val("");
    }
  }
});

button.onclick = function () {
  // if #search-input is empty, send error message to modal else get value from class=input on html
  if ($("#search-input").val() === "") {
    // append p id="error" in html
    $("#error").append("<p>Please enter a city</p>");
    // turns map off
    map.off();
    // removes map
    map.remove();
    // calls modalError function
    modalError();
  } else {
    var city = $("#search-input").val();
    // calls saveCity function to save city to local storage
    saveCity(city);
    // calls getCity function to get city from input
    getCity(city);
    // loads cities from local storage to refresh buttons
    loadCities();
  }
};

// city-buttons add click event to each button
$("#city-buttons").on("click", ".button", function () {
  var city = $(this).text();
  // send to saveCity function
  saveCity(city);
  // send to getCity function
  getCity(city);
  // adds loading icon to button until brewery data is collected
  $(this).addClass("is-loading");
});

// function to call geoaip and query city
function getCity(city) {
  // call geoaip and query city
  var urlcity = geoapi + city + "&countryFilter=US"+ "&apiKey=" + apikey;
  // ajax call to geoaip
  $.getJSON(urlcity, function (data) {;
    // if data array is not empty
    if (data.length !== 0) {
      // get data from array under locations 0: referencePostition
      var lat = data.locations[0].referencePosition.latitude;
      var lng = data.locations[0].referencePosition.longitude;
      var coordinates = lat + "," + lng;
      // turns map off
      map.off();
      // removes map
      map.remove();
      // calls mapcity function
      mapcity(coordinates);
      // calls getBreweryData function
      getBreweryData(city);
      // remove is-loading class from button
      $(".button").removeClass("is-loading");
    } else {
      // appends <p> with error </p>
      $("#error").append("<p>CITY NOT FOUND</p>");
      // calls modalError function
      modalError();
      // calls to removebutton function
      removebutton();
    }
  });
}

function removebutton() {
  // removes last button in city-buttons and removes last entry from localstorage
  $("#city-buttons").children().last().remove();
  // var all cities from list of cities in localstorage
  var cities = JSON.parse(localStorage.getItem("cities"));
  // removes last entry from localstorage
  cities.pop();
  // set localstorage to cities and pushes list back to localstorage
  localStorage.setItem("cities", JSON.stringify(cities));
}


// get users current location from browser and var lat and longitude and pass to map function
//https://www.codeunderscored.com/how-to-get-a-user-location-using-html-and-javascript/
function getLocation() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      var lat = location.latitude;
      var lng = location.longitude;
      var coordinates = lat + "," + lng;
      mapcity(coordinates);
    },
  });
}

function showPosition(position) {
  // saves position to local storage as lat and longitude
  localStorage.setItem("lat", position.coords.latitude);
  localStorage.setItem("lng", position.coords.longitude);
  lat = position.coords.latitude;
  long = position.coords.longitude;
  var coordinates = lat + "," + long;
  mapcity(coordinates);
}

getLocation();

// initialize map when latitude and longitude are available
var mapcity = (coordinates) => {
  // parse out coordinates to get latitude and longitude
  var lat = coordinates.split(",")[0];
  var lng = coordinates.split(",")[1];
  // if lat and long are not null or undefined, initialize map
  if (lat !== null && lng !== null && lat !== undefined && lng !== undefined) {
    // initialize map with set information 
    map = L.map("map").setView([lat, lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    }).addTo(map);
  }
};

// leaflet map icons extended attributes
var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: "",
    iconSize: [50, 50],
    shadowSize: [50, 64],
    iconAnchor: [22, 50],
    shadowAnchor: [4, 62],
    popupAnchor: [0, -10],
  },
});
// leaflet map icons and attributes
var beermug = new LeafIcon({ iconUrl: "./assets/images/beer-mug-icon.png" });
var beermug = L.icon({
  iconUrl: "./assets/images/beer-mug-icon.png",
  shadowUrl: "",
  iconSize: [50, 50], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
});

  // function for getting brewery data from API
function getBreweryData(city) {
  // while waiting for brewery data show put loading icon on button using class="button is-loading"
  $("#button").addClass("button is-outlined is-fullwidth is-loading");
  // get brewery data from API
  $.getJSON(breweryAPI + city + endAPI, function (data) {
  // loop through brewery data and create markers for each brewery
    for (var i = 0; i < data.length; i++) {
      var brewery = data[i];
      var lat = brewery.latitude;
      var lng = brewery.longitude;
  // if lat and long are not null or undefined, create marker
      if (lat !== null || lng !== null) {
        var marker = L.marker([lat, lng], { icon: beermug }).addTo(map);
        // data from brewery API for Marker data
        marker.bindPopup(
          brewery.name +
            "<br>" +
            brewery.street +
            "<br>" +
            brewery.city +
            "<br>" +
            brewery.state +
            "<br>" +
            brewery.phone +
            "<br>" +
            ("<a href='" +
              brewery.website_url +
              "' target='_blank'>" +
              brewery.name +
              "</a>")
        );
      }
    }
  });
}

    // function to parse data from local storage city list
function loadCities() {
    // remove all items from #city-buttons
  $("#city-buttons").empty();
    // get cities from local storage
  var cities = JSON.parse(localStorage.getItem("cities"));
  console.log(cities);
    // check if local storage is empty if so exit function if not empty loop through cities and create buttons for each city
  if (cities !== null) {
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
    // create button for city
      var button = $("<button>");
    // adds class to button
      button.addClass("button mt-1 is-outlined is-fullwidth");
    // adds attribute to button from variable
      button.attr("data-name", city);
    // adds text to button from variable
      button.text(city);
    // adds button to #city-buttons
      $("#city-buttons").append(button);
    }
  }
}

loadCities();

    // function for local storage of city searches
function saveCity(city) {
    // if local storage is empty create array and push city to array
  if (localStorage.getItem("cities") === null) {
    var cities = [];
    // pushes city to array
    cities.push(city);
    // set local storage to cities array with city name
    localStorage.setItem("cities", JSON.stringify(cities));
    // if local storage is not empty create array and push city to array
  } else if (localStorage.getItem("cities") !== null) {
    var cities = JSON.parse(localStorage.getItem("cities"));
    if (cities.indexOf(city) === -1) {
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }
}

// create button event for 'being' clicked and call generatePassword function
$("#begin").on("click", function () {
  generatePassword();
});
