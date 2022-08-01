var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
customer();

span.onclick = function () {
  modal.style.display = "none";
};

// function for modal
function modalError() {
  modal.style.display = "block";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// on click of id=yes store yes to local storage under customer
$("#yes").on("click", function () {
  if (localStorage.getItem("customer") === null) {
    // create customer and store yes to local storage
    localStorage.setItem("customer", "yes");
  }
  customer();
});

// no click sends customer to rootbeer.com
$("#no").on("click", function () {
  $("#error").append("<p>Must be 21 or older to enter, sorry!</p>");
  modalError();
  // set timer to 2 seconds then forward to www.rootbeer.com
  setTimeout(function () {
    window.location.href = "https://www.rootbeer.com/";
  }, 2000);
});

// load customer response from local storage if yes go to beerfinder.html
function customer() {
  if (localStorage.getItem("customer") === "yes") {
    window.location.href = "beerfinder.html";
  }
}
