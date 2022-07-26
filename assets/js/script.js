//https://api.openbrewerydb.org/

var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=";
//https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3
var city = "salt_lake_city"
var endAPI = "&per_page=50"
var url = breweryAPI + city + endAPI;


// fetch url and then parse JSON data to get brewery info in lists of breweries
fetch(url)
   .then(function(response) {
      return response.json();
   }
)
   .then(function(data) {
      // send data into brewery name brewery address city state zip phone website established image in html 
      for (var i = 0; i < data.length; i++) {
         var breweryName = data[i].name;
         var breweryAddress = data[i].street;
         var breweryCity = data[i].city;
         var breweryState = data[i].state;
         var breweryZip = data[i].postal_code;
         var breweryPhone = data[i].phone;
         var breweryWebsite = data[i].website_url;
         var breweryEstablished = data[i].established;
         var breweryList = document.createElement("li");
         var breweryListText = document.createTextNode(breweryName + " " + breweryAddress + " " + breweryCity + " " + breweryState + " " + breweryZip + " " + breweryPhone + " " + breweryWebsite + " " + breweryEstablished + " " + breweryImage);
         breweryList.appendChild(breweryListText);
         document.getElementById("breweryList").appendChild(breweryList);
      }
     
   }
);

      