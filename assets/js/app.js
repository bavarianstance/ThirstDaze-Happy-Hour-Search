
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUXeB8UNCzcrN5kXuLmAxR1xw9o80Hcjs",
    authDomain: "thirstdaze.firebaseapp.com",
    databaseURL: "https://thirstdaze.firebaseio.com",
    projectId: "thirstdaze",
    storageBucket: "",
    messagingSenderId: "306943671334"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var queryURL = "https://api.yelp.com/v3/businesses/search"

   $(document).ready(function () {

      jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
          options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
      });

      $(".yelp").on("submit", function () {
        event.preventDefault()

      var location = $("#location").val()
      var category = $("#category").val()
      var radius = $("#radius").val()
      var price = $("#price").val()

        $.ajax({
          url: 'https://api.yelp.com/v3/businesses/search?term=' + category + '&location=' + location + '',
          method: "GET",
          headers: {
            authorization: "Bearer u94GL1gHllHagHc-SWqFcBuNgsLm-EpZoH8kVCeCTJ4g51NHhxgpBhOMid1Oc8Y_7TXgddr0Abi-CyhEqGw3fvJNLi6tJAlAdZH8o02CNMT0s-if4OBJMnwRfoOEXHYx"
          }
        }).then(function (response) {
          console.log(response)

          for (var i = 0; i < response.businesses.length; i++) {
            $(".container").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">'+response.businesses[i].display_phone+'</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
          }

        });

      });
    })