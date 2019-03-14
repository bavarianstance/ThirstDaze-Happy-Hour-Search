var config = {
    apiKey: "AIzaSyDkTx3oZPQengp6Wa0c9brsPQfc-jj9gXg",
    authDomain: "ladytaythebugalex.firebaseapp.com",
    databaseURL: "https://ladytaythebugalex.firebaseio.com",
    projectId: "ladytaythebugalex",
    storageBucket: "ladytaythebugalex.appspot.com",
    messagingSenderId: "332975401413"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var businessId = "";
var dealDesc = "";
var monday = "";
var tuesday = "";
var wednesday = "";
var thursday = "";
var friday = "";
var startHour = "";
var endHour = "";
var thumbsup = 0;
var thumbsdown = 0;

var markerCoords = [];

/* Function to find avg lat and avg lng to set for map.center. */
function findCenter(latLngCoords) {
    // Will be passed to map.center, a required property.
    var mapCenter = {};
    var latTotal = 0;
    var lngTotal = 0;

    for (var i = 0; i < latLngCoords.length; i++) {
      latTotal += latLngCoords[i].lat;
      lngTotal += latLngCoords[i].lng;
    };

    var avgLat = latTotal / markerCoords.length;
    var avgLng = lngTotal / markerCoords.length;

    mapCenter.lat = avgLat;
    mapCenter.lng = avgLng;

    return mapCenter;
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: findCenter(markerCoords)
  });

  var label = 0;
  // Create map marker for each search result.
  for (var i = 0; i < markerCoords.length; i++) {
    var position = {lat: markerCoords[i].lat,
                    lng: markerCoords[i].lng
    };
    var title = markerCoords[i].title;
    label++;
    console.log(label);
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        label: label.toString()
    });
  };
};

$("#map").hide();

$(document).ready(function(){

    $("div.category button.btn").click(function(){
      $("div.btn-group-lg").find(".active").removeClass("active");
      $(this).addClass("active");
    });  
    
    $("div.price button.btn").click(function(){
      $("div.btn-group").find(".active").removeClass("active");
      $(this).addClass("active");
    });  
  
     $("div.radius button.btn").click(function(){
      $("div.btn-group-sm").find(".active").removeClass("active");
      $(this).addClass("active");
    });  
  
  
  });

$(document).ready(function () {

    // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $(".yelp").on("submit", function () {
        $(".container").empty();
        event.preventDefault();



        var location = $("#location").val()
        var category = $("div.category button.active").val()
        var price = $("div.price button.active").val()
        var distance = $("div.radius button.active").val()
        var term = $("#search").val()

        if (location === "" || category === undefined || price === undefined || distance === undefined) {
            $("#errorModal").modal("toggle");
            return;
            };

        // removing search fields and replacing with results
        $(".searchvis").empty();
        $(".searchvis").attr("class", "searchinvis");
        $(".resultInvisOne").attr("class", "resultVisOne");
        $(".resultInvisTwo").attr("class", "resultVisTwo");

        $.ajax({
            url: 'https://api.yelp.com/v3/businesses/search?categories=' + category + '&term=happy+hour' + "+" + term + '&location=' + location + '&radius=' + distance + '&price=' + price + '&limit=10',
            method: "GET",
            headers: {
                authorization: "Bearer u94GL1gHllHagHc-SWqFcBuNgsLm-EpZoH8kVCeCTJ4g51NHhxgpBhOMid1Oc8Y_7TXgddr0Abi-CyhEqGw3fvJNLi6tJAlAdZH8o02CNMT0s-if4OBJMnwRfoOEXHYx"
            }
        }).then(function (response) {
            console.log(response)

                    if (response.businesses.length === 0) {
                        $(".resultVisTwo").append('<br><h2 class="noresults">No Results' + '</h2><br><p class="suggestion">Please try further and/or cheaper' + '</p><hr>' );
                        $(".resultVisTwo").append('<button type="button" class="btn btn-warning" id="newsearch">New Search</button>');
                        $("#newsearch").on("click", function(){
                            window.location.reload();
                        });
                    } 

            for (var i = 0; i < response.businesses.length; i++) {
                
                var markerPosition = {
                    lat: response.businesses[i].coordinates.latitude,
                    lng: response.businesses[i].coordinates.longitude,
                    title: response.businesses[i].name
                  };

                  // Store lat/lng coordinates in markerCoords.
                  markerCoords.push(markerPosition);
                
                businessId = response.businesses[i].id
                name = response.businesses[i].name;

                function writeBusinessData(businessId, name) {
                    database.ref().on("value", function (snapshot) {

                        if (firebase.database().ref('businesses/' + businessId) === null) {

                            firebase.database().ref('businesses/' + businessId).set({
                                name: name,
                                thumbsup: thumbsup,
                                thumbsdown: thumbsdown,
                                monday: monday,
                                tuesday: tuesday,
                                wednesday: wednesday,
                                thursday: thursday,
                                friday: friday,
                                startHour: startHour,
                                endHour: endHour,
                                dealDesc: dealDesc
                            }
                            );
                        }
                    });

                }

                writeBusinessData(businessId, name);



                var divRow = $("<div>");
                divRow.addClass("results");
                var divColOne = $("<div>");
                divColOne.addClass("col-lg-2");
                divColOne.addClass("col-sm-6");
                divColOne.addClass("thumbnail")
                var divColTwo = $("<div>");
                divColTwo.addClass("col-lg-3")
                divColTwo.addClass("col-sm-6");
                divColTwo.addClass("name");
                var divColThree = $("<div>");
                divColThree.addClass("col-lg-3")
                divColThree.addClass("col-sm-12")
                divColThree.addClass("address")
                var divColFour = $("<div>");
                divColFour.addClass("col-lg-2");
                divColFour.addClass("col-sm-12");
                divColFour.addClass("modalButton")
                var divColFive = $("<div>");
                divColFive.addClass("col-lg-1")
                divColFive.addClass("col-sm-6")
                divColFive.addClass("thumbsUp")
                var divColSix = $("<div>");
                divColSix.addClass("col-lg-1")
                divColSix.addClass("col-sm-6")
                divColSix.addClass("thumbsDown")



                var image = response.businesses[i].image_url;
                var imageData = $("<img>");
                imageData.addClass("thumbnail");
                imageData.attr("src", image);
                $(divColOne).append(imageData);



                var resultNum = (parseInt(i) + 1 + ".  ");
                var resultNumData = $("<h3>");
                resultNumData.addClass("resultNumber");
                $(resultNumData).append(resultNum, name);
                $(divColTwo).append(resultNumData);



                var phone = response.businesses[i].display_phone;
                var address = response.businesses[i].location.address1;
                var city = response.businesses[i].location.city;
                var zip = response.businesses[i].location.zip_code;
                var resultPhone = $("<p>");
                $(resultPhone).append(phone);
                var resultAddress = $("<p>");
                $(resultAddress).append(address);
                var resultCity = $("<p>");
                $(resultCity).text(city + ", CA " + zip);
                $(divColThree).append(resultPhone, resultAddress, resultCity);

                var modalButton = $("<button>");
                modalButton.attr("data-name", businessId);
                modalButton.attr("data-busname", name);
                modalButton.addClass("modalClass");
                // modalButton.attr("id", "modalId" + i)
                modalButton.attr("type", "button");
                modalButton.attr("data-toggle", "modal");
                modalButton.attr("data-target", "#detailModal");
                modalButton.addClass("btn");
                modalButton.addClass("btn-secondary");
                modalButton.addClass("btn-lg");
                modalButton.text("Add Happy Hour Deets");
                $(divColFour).append(modalButton);


                var thumbsupButton = $("<button>");
                // thumbsupButton.attr("src", "thumbsup.png");
                thumbsupButton.attr("data-name", businessId);
                thumbsupButton.attr("id", "add-thumbsup");
                thumbsupButton.addClass("btn");
                thumbsupButton.addClass("btn-secondary");
                thumbsupButton.text("thumbs up");
                $(divColFive).append(thumbsupButton);

                var thumbsdownButton = $("<button>");
                // thumbsdownButton.attr("src", "/project-happyhour/thumbsdown.png");
                thumbsdownButton.attr("id", "add-thumbsdown");
                thumbsdownButton.attr("data-name", businessId);
                thumbsdownButton.addClass("btn");
                thumbsdownButton.addClass("btn-secondary");
                thumbsdownButton.text("thumbs down");
                $(divColSix).append(thumbsdownButton);

                
                $(divRow).append(divColOne, divColTwo, divColThree, divColFour, divColFive, divColSix);
                $(".resultVisTwo").append(divRow);
                // $(divRow).empty();
            }

            initMap();
            $("#map").show();
            console.log(markerCoords)

        }

        );
    });
});

// database.ref().on("value", function (snapshot) {
// We are now inside our .on function...

// Console.log the "snapshot" value (a point-in-time representation of the database)
// console.log(snapshot.val());
// This "snapshot" allows the page to get the most current values in firebase.

// Change the value of our clickCounter to match the value in the database
// thumbsup = snapshot.val().thumbsup;
// thumbsdown = snapshot.val().thumbsdown;

// Console Log the value of the clickCounter
// console.log(thumbsup);
// console.log(thumbsdown);
// });

$(document).on("click", "#add-thumbsup", function (event) {
    event.preventDefault();



    // Grabbed values from text-boxes
    businessId = $(this).attr("data-name");
    console.log($(this).attr("data-name"));

    database.ref('businesses/' + businessId).on("value", function (snapshot) {
        thumbsup = snapshot.val().thumbsup;
        console.log(thumbsup);
        thumbsup++;
        console.log(thumbsup);

    })
    database.ref('businesses/' + businessId).update({
        thumbsup: thumbsup
    });
})

$(document).on("click", "#add-thumbsdown", function (event) {
    event.preventDefault();



    // Grabbed values from text-boxes
    businessId = $(this).attr("data-name");
    console.log($(this).attr("data-name"));

    database.ref('businesses/' + businessId).on("value", function (snapshot) {
        thumbsdown = snapshot.val().thumbsdown;
        console.log(thumbsdown);
        thumbsdown++;
        console.log(thumbsdown);

    })
    database.ref('businesses/' + businessId).update({
        thumbsdown: thumbsdown
    });



});

$(document).on("click", ".modalClass", function (event) {
    event.preventDefault();
    businessId = $(this).attr("data-name");
    console.log($(this).attr("data-name"));
    name = $(this).attr("data-busname");
    console.log($(this).attr("data-busname"));
    $("#businessname").text(name);
    $("#detailModal").on("click", "#detailSubmit", function (event) {
        console.log($("#monday").prop("checked"));
        database.ref('businesses/' + businessId).update({
            dealDesc: $("#detailsText").val().trim(),
            monday: $("#monday").prop("checked"),
            tuesday: $("#tuesday").prop("checked"),
            wednesday: $("#wednesday").prop("checked"),
            thursday: $("#thursday").prop("checked"),
            friday: $("#friday").prop("checked"),
            startHour: $("#startTime").val().trim(),
            endHour: $("#endTime").val().trim()
        });
        $("#detailModal").modal("toggle");
    });
});