# Group14-Brewery Finder

Brewery Finder is a web application that allows users to search for breweries in the United States and view their information.  Users search by a city and can view breweries with in that city.

## Project Requirements:

You and your group will use everything you’ve learned over the past six modules to create a real-world front-end application that you’ll be able to showcase to potential employers. The user story and acceptance criteria will depend on the project that you create.

* Use a CSS framework other than Bootstrap.

* Be deployed to GitHub Pages.

* Be interactive (i.e., accept and respond to user input).

* Use at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources).

* Does not use alerts, confirms, or prompts (use modals).

* Use client-side storage to store persistent data.

* Be responsive.

* Have a polished UI.

* Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

* Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).


## Technology Used:

## API's:
[leaflet](https://leafletjs.com/) - Leaflet is a JavaScript library for displaying maps.

[openbrewerydb](https://openbrewerydb.com/) - Open Brewery Database is a database of breweries in the United States.

[PTV Group API](https://www.myptv.com/en) - PTV Group API is a Forward Geolocation reference allowing you to search by state, city, address and much more. 

[geolocation-db.com](http://geolocation-db.com) is a API to get an approximate location of user via their IP

## Bulma CSS Framework:
[Bulma](https://bulma.io/) - Bulma is a free and open source framework for responsive, mobile-first layouts.


## User Story:

* **Given** I am a user who wants to find breweries within a city
* **When** I search for breweries
* **Then** I can see a list of breweries within the city specified.

 * **Given** I enter a city in the search field
* **When** it loads a map of the city searched
* **Then** displays breweries of that city and marks them on the map.

* **Given** I want to see the details of the brewery
* **When**  I click on a brewery marker on the map
* **Then** I can see the details of the brewery
* **And** I can click a link to the brewery's website.


## The Creators:
**Jerrod Linderman** - Beer Lover, PC Ethusiast, and a gamer to boot. 

**Rhiannon Burk(Rayne)** -A 3D-modeling enthusiast and decdicated gearhead who spends weekends at the local car meet. Aims to go on to learn Python and other proigramming languages.

### Challenges: 

Bulma CSS has very limited details on how to style elements and allow them to work together.

Positions Stack was a bit of a challenge to get working. Though it didnt work due to it being a paid service for https requests which github requires, we swapped that out for PTV Group API which is free use on https requests 

Having 2 people in our group, group knowledge was limited. 

Github push / pull merge conflicts were a bit of a challenge to resolve.




### Successes:
Adapting new solutions in the face of bulma difficulties.

Bulma Tiles, after trying to use columns and its structure we found columns are not viable for what we wanted, we tried tiles and were able to manage and style them.

while using bulma Button interference with JS "button.onclick" and reworked with breadcrumb

Fixed issues with positionstack by using PTV Group API and with their documentation and a bit of help from classmate was able to get the response data I needed.  

Self Created icons and header image to use with in our project. 

Implementing modals with Map Layering learning how to turn off and dispose of maps already loaded before opening modal.

With only a two-person team we leveraged our resources and TA's effectively also our resources and online resources to get the project done.

Read dozens of articles on github practices and actions was able to resolve most of our issues.



![](/assets/images/index.png)

![](/assets/images/indexmodal.png)

![](/assets/images/breweryfinder.png)

![](/assets/images/citynotfound.png)

![](/assets/images/markerpin.png)



## Repo:
https://github.com/nvmax/Group-14-brewery

## Deployed Site:
https://nvmax.github.io/Group-14-brewery/beerfinder.html
