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
        var uniqueId = "";
        var dealDesc = "";
        var monday = "";
        var tuesday = "";
        var wednesday = "";
        var thursday = "";
        var friday = "";
        var startHour = "";
        var endHour = "";
        var likes = 0;
        var dislikes = 0;



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
                var category = $("#category").val()
                var price = $("#price").val()
                var distance = $("#distance").val()
                var term = $("#search").val()
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



                    for (var i = 0; i < response.businesses.length; i++) {
                        // var divRow = $("<div>");
                        // divRow.addClass("row");

                        // var image = response.businesses[i].image_url;
                        // var imageData = $("<img>");
                        // imageData.addClass("thumbnail");
                        // imageData.attr("src", image);
                        // imageData.addClass("thumbnail");
                        // var 

                        // var resultNum = (parseInt(i) + 1);
                        // var resultNumData = $("<h2>");
                        // nameData.addClass("resultNumber");
                        
                        // var resultName = response.businesses[i].name
                        // var resultPhone = response.businesses[i].display_phone
                        
                        // nameData.append(resultNumData);


                        $(".resultVisTwo").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/>' + '<h2 class="resultnumber">' + (parseInt(i) + 1) + '.</h2><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
                    }

                });
            });
        })
