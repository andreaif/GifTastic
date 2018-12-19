$(document).ready(function() {
    //create arrays
    var topics = [];
         function displayAnimals() {
        var x = $(this).data("search");
        console.log(x);
      // limit 10 result
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=yoebTfTEFKrq04Z6HsSKfLlo0NnSK3bW&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var showDiv = $("<div class='col-md-6'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("Giphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#giphy").prepend(showDiv);
    
            }
        });
    }
    
    //Giphy Images only move when clicking
  $(document).on("click", "Giphy", stopGifs);
    function stopGifs() {
         var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
    //click Submit buttons to run the array
  $("#Submitbtn").on("click", function(event) {
      event.preventDefault();
      var newShow = $("#animalInput").val().trim();
      topics.push(newShow);
      console.log(topics);
      $("#animalInput").val(' ');
      displayButtons();
  });
    
      //btn function
      $(document).on("click", "#show", displayAnimals);
        function displayButtons() {
        $("#btn").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "show");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#btn").append(a);
        }
      }
      displayButtons();

     
    });