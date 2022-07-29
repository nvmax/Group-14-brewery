var modal = document.getElementById('main-modal'); // Variable for Modal
var button = document.getElementById('button'); // Variable for button
var map
var button = document.getElementById('button') // Variable for button
var map;
const coordinates ={};
//https://api.openbrewerydb.org/
var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=";
//https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3
// var city = "minneapolis"
var endAPI = "&per_page=200";
geoapi ="http://api.positionstack.com/v1/"
apikey ="0c016d19421d4c9f6672fb2ff1025c84";
// http://api.positionstack.com/v1/forward
//     ? access_key = YOUR_ACCESS_KEY
//     & query = 40.7638435,-73.9729691

// function to clear out class.input field in html when clicked
$(".input").click(function() {
      $(this).val("");
}
);

// keyboard event enter on class.input send value to getcity and savecity functions
$("#search-input").keypress(function (event) {
   if (event.which == 13) {
       var city = $("#search-input").val();
         getCity(city);
         saveCity(city);
   }
});



button.onclick = function() {
    // get value from class=input on html
      var input = document.getElementsByClassName('input')[0].value;

      city = input;
      // call getCity function to get city from input
      getCity(input);
      // call getBreweryData function to get brewery data from API
      saveCity(input);

}


//https://api.openbrewerydb.org/


// function to call geoaip and query city
function getCity(city) {
   var urlcity = geoapi + "forward" + "?access_key=" + apikey + "&query=" + city;
   $.getJSON(urlcity, function(data) {
     // get latitude and longitude from API
       var lat = data.data[0].latitude;
         var lng = data.data[0].longitude;
         console.log(lat);
         console.log(lng);
         var coordinates = (lat + "," + lng);
         map.off();
         map.remove(); 
         mapcity(coordinates);
         console.log(city);
         getBreweryData(city);
      
   } 
)
}


// get users current location from browser and var lat and longitude and pass to map function
//https://www.codeunderscored.com/how-to-get-a-user-location-using-html-and-javascript/
function getLocation() {
      if (navigator.geolocation) {
         console.log("get location works")
         navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
         x.innerHTML = "Geolocation is not supported by this browser.";
      }
   }

   function showPosition(position) {
      console.log("this works too!")
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var coordinates = (lat + "," + long);
      mapcity(coordinates);
      map(coordinates);
      getBreweryData();  

   }

   getLocation();
   
   // error function for geolocation
   function showError(error) {
      switch (error.code) {
         case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
         case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
         case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
         case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
      }
   }
   
// initialize map when latitude and longitude are available

var mapcity = (coordinates)=> {
   // parse out coordinates to get latitude and longitude
   var lat = coordinates.split(",")[0];
   var lng = coordinates.split(",")[1];
    
   map = L.map('map').setView([lat,lng], 13);
   
   L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
   }).addTo(map)
}
var LeafIcon = L.Icon.extend({
   options: {
       shadowUrl: 'leaf-shadow.png',
       iconSize:     [38, 95],
       shadowSize:   [50, 64],
       iconAnchor:   [22, 94],
       shadowAnchor: [4, 62],
       popupAnchor:  [-3, -76]
   }
});

var greenIcon = new LeafIcon({iconUrl: './assets/images/pin.png'}),
    redIcon = new LeafIcon({iconUrl: './assets/images/leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: './assets/images/leaf-orange.png'});



var greenIcon = L.icon({
   iconUrl: './assets/images/pin.png',
   shadowUrl: './assets/images/leaf-shadow.png',

   iconSize:     [50, 50], // size of the icon
   // shadowSize:   [50, 64], // size of the shadow
   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
   // shadowAnchor: [4, 62],  // the same for the shadow
   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// function for getting brewery data from API
function getBreweryData(city) {
   // get brewery data from API
   var city = city;
   $.getJSON(breweryAPI + city + endAPI, function(data) {
      console.log(data);
      // loop through brewery data and create markers for each brewery
      for (var i = 0; i < data.length; i++) {
         var brewery = data[i];
         var lat = brewery.latitude;
         var lng = brewery.longitude;
          
         if (lat !== null || lng !== null){
            var marker = L.marker([lat,lng], {icon: greenIcon}).addTo(map);
            marker.bindPopup(brewery.name + "<br>" + brewery.street + "<br>" + brewery.city + "<br>" + brewery.state + "<br>" + brewery.phone + "<br>" + brewery.website_url);
         }
      }
   });
}


// function for local storage of city searches
function saveCity(city) {
   // save city to local storage as an array if not already there
   if (localStorage.getItem("cities") === null) {
      var cities = [];
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
   } else {
      // if city is null skip else add to city if not already there
      if (city !== null) {
         var cities = JSON.parse(localStorage.getItem("cities"));
         if (cities.indexOf(city) === -1) {
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
         }    
      }
   }
};

// function to parse data from local storage city list
function getCities() {
   // get cities from local storage
   var cities = JSON.parse(localStorage.getItem("cities"));
   console.log(cities);
   // loop through cities and create buttons for each city
   for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      var button = $("<button>");
      button.addClass("button is-outlined is-fullwidth");
      button.attr("data-name", city);
      button.text(city);
      $("#city-buttons").append(button);
   }
};

getCities();

// function for local storage of city searches
function saveCity(city) {
   // save city to local storage as an array if not already there
   if (localStorage.getItem("cities") === null) {
      var cities = [];
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
   } else {
      // if city is null skip else add to city if not already there
      if (city !== null) {
         var cities = JSON.parse(localStorage.getItem("cities"));
         if (cities.indexOf(city) === -1) {
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
         }    
      }
   }
};

// function to parse data from local storage city list
function getCities() {
   // get cities from local storage
   var cities = JSON.parse(localStorage.getItem("cities"));
   console.log(cities);
   // loop through cities and create buttons for each city
   for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      var button = $("<button>");
      button.addClass("button is-outlined is-fullwidth");
      button.attr("data-name", city);
      button.text(city);
      $("#city-buttons").append(button);
   }
};

getCities();

