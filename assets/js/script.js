var modal = document.getElementById('main-modal'); // Variable for Modal
var button = document.getElementById('button'); // Variable for button
var map

button.onclick = function() {
    modal.style.display = 'block';
}

//https://api.openbrewerydb.org/

var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=";
//https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3
var city = "minneapolis"
var endAPI = "&per_page=50"
var url = breweryAPI + city + endAPI;


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
   
// initialize map function when latitude and longitude are available
function map(coordinates) {
   // parse out coordinates to get latitude and longitude
   var lat = coordinates.split(",")[0];
   var lng = coordinates.split(",")[1];
   map = L.map('map').setView([lat,lng], 13);
   
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

var greenIcon = new LeafIcon({iconUrl: './assets/images/leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: './assets/images/leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: './assets/images/leaf-orange.png'});



var greenIcon = L.icon({
   iconUrl: './assets/images/leaf-green.png',
   shadowUrl: './assets/images/leaf-shadow.png',

   iconSize:     [38, 95], // size of the icon
   shadowSize:   [50, 64], // size of the shadow
   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
   shadowAnchor: [4, 62],  // the same for the shadow
   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// function for getting brewery data from API
function getBreweryData() {
   // get brewery data from API
   $.getJSON(url, function(data) {
      console.log(data);
      // loop through brewery data and create markers for each brewery
      for (var i = 0; i < data.length; i++) {
         var brewery = data[i];
         console.log(data);
         var lat = brewery.latitude;
         var lng = brewery.longitude;
         if (lat !== null || lng !== null){
            var marker = L.marker([lat,lng], {icon: greenIcon}).addTo(map);
            marker.bindPopup(brewery.name);

         }
      }
   });
}


