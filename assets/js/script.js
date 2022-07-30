// var modal 
var modal = document.getElementById("myModal");
var city = city;
var button = document.getElementById('button') // Variable for button
var span = document.getElementsByClassName("close")[0];
var map;
const coordinates ={};
//https://api.openbrewerydb.org/
var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=";
//https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3
// var city = "minneapolis"
var endAPI = "&per_page=50";
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
span.onclick = function() {
   modal.style.display = "none";
   // reload getcity function
   location.reload();
 }


// function for modal
function modalError() {
   modal.style.display = "block";
}

window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
     // reload page
       location.reload();
   }
 }

// keyboard event enter on class.input send value to getcity and savecity functions
$("#search-input").keypress(function (event) {
   if (event.which == 13) {
      // if #search-input is empty, send error message to modal 
      if ($("#search-input").val() === "") {
         // append id="error" in html
         $("#error").append("<p>Please enter a city</p>");
         
         map.off();
         map.remove();
         modalError();
      }
      // else get value from class=input on html
      else {
       var city = $("#search-input").val();
       saveCity(city);
       // calls getCity function to get city from input
       getCity(city);
       // calls getBreweryData function to get brewery data from API
       loadCities();
       // clears search-input field
         $("#search-input").val("");
      }
   }
});



button.onclick = function() {
   // if #search-input is empty, send error message to modal else get value from class=input on html
   if ($("#search-input").val() === "") {
      // append id="error" in html
      $("#error").append("<p>Please enter a city</p>");
      map.off();
      map.remove();
      modalError();
   }
   else {
      var city = $("#search-input").val();
      saveCity(city);
      // calls getCity function to get city from input
      getCity(city);
      // calls getBreweryData function to get brewery data from API
      getBreweryData(city);
      loadCities();
   }
}



// city-buttons add click event to each button
$("#city-buttons").on("click", ".button", function() {
   var city = $(this).text();
   // send to get city function
   saveCity(city);
   getCity(city);
   // send to get brewery data function
   getBreweryData(city);
   
   $(this).addClass("is-loading");
}  
);


// function to call geoaip and query city
function getCity(city) {
   console.log(city);
   var urlcity = geoapi + "forward" + "?access_key=" + apikey + "&country=US&query=" + city;
   console.log(urlcity);
   $.getJSON(urlcity, function(data) {
      console.log(data);
      // if data array is not empty
      if (data.data.length !== 0) {
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
         // remove is-loading class from button
         $(".button").removeClass("is-loading");
      }else{
         // if data is empty, send error message to modal
         $("#error").append("<p>CITY NOT FOUND</p>");
         modalError();
         removebutton();
         console.log("error");
      }
      
   } 
)
}

function removebutton() {
   // remove button last button in city-buttons and remove last entry from localstorage
   $("#city-buttons").children().last().remove();
   // var cities from localstorage
   var cities = JSON.parse(localStorage.getItem("cities"));
   // remove last entry from localstorage
   cities.pop();
   // set localstorage to cities
   localStorage.setItem("cities", JSON.stringify(cities));
}

// get users current location from browser and var lat and longitude and pass to map function
//https://www.codeunderscored.com/how-to-get-a-user-location-using-html-and-javascript/
function getLocation() {
   $.ajax({
      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function(location)
      {
         var lat = location.latitude;
         var lng = location.longitude;
         var coordinates = (lat + "," + lng);
         mapcity(coordinates);
         
      }
   });
   }

   function showPosition(position) {
      // save position to local storage as lat and longitude
      console.log(position);
      localStorage.setItem("lat", position.coords.latitude);
      localStorage.setItem("lng", position.coords.longitude);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var coordinates = (lat + "," + long);
      mapcity(coordinates);
      
   }
   getLocation();   
   
// initialize map when latitude and longitude are available
var mapcity = (coordinates)=> {
   // parse out coordinates to get latitude and longitude
   var lat = coordinates.split(",")[0];
   var lng = coordinates.split(",")[1];
   // if lat and long are not null or undefined, initialize map
   if (lat !== null && lng !== null && lat !== undefined && lng !== undefined) {
    
   map = L.map('map').setView([lat,lng], 13);
   
   L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
   }).addTo(map)
}
}
var LeafIcon = L.Icon.extend({
   options: {
       shadowUrl: '',
       iconSize:     [50, 50],
       shadowSize:   [50, 64],
       iconAnchor:   [22, 50],
       shadowAnchor: [4, 62],
       popupAnchor:  [0, -10]
   }
});

var greenIcon = new LeafIcon({iconUrl: './assets/images/beer-mug-icon.png'});
var greenIcon = L.icon({
   iconUrl: './assets/images/beer-mug-icon.png',
   shadowUrl: '',
   iconSize:     [50, 50], // size of the icon
   shadowSize:   [50, 64], // size of the shadow
   iconAnchor:   [22, 50], // point of the icon which will correspond to marker's location
   shadowAnchor: [4, 62],  // the same for the shadow
   popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
});


// function for getting brewery data from API
function getBreweryData(city) {
   // while waiting for brewery data show put loading icon on button using class="button is-loading"
   $("#button").addClass("button is-outlined is-fullwidth is-loading");
   
   // get brewery data from API
   
   $.getJSON(breweryAPI + city + endAPI, function(data) {
      // loop through brewery data and create markers for each brewery
      for (var i = 0; i < data.length; i++) {
         var brewery = data[i];
         var lat = brewery.latitude;
         var lng = brewery.longitude;

         if (lat !== null || lng !== null){
            var marker = L.marker([lat,lng], {icon: greenIcon}).addTo(map);
            marker.bindPopup(brewery.name + "<br>" + brewery.street + "<br>" + brewery.city + "<br>" + brewery.state + "<br>" + brewery.phone + "<br>" + ("<a href='" + brewery.website_url + "' target='_blank'>" + brewery.name + "</a>")); 
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
         var button = $("<button>");
         button.addClass("button mt-1 is-outlined is-fullwidth");
         button.attr("data-name", city);
         button.text(city);
         $("#city-buttons").append(button);
      }
   }
};

loadCities();

// function for local storage of city searches
function saveCity(city) {
   // save city to local storage 
   if (localStorage.getItem("cities") === null) {
      var cities = [];
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
      
   } else if (localStorage.getItem("cities") !== null) {
      var cities = JSON.parse(localStorage.getItem("cities"));
      if (cities.indexOf(city) === -1) {
         cities.push(city);
         localStorage.setItem("cities", JSON.stringify(cities));
      }
   }
};

