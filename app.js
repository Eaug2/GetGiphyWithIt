console.log("script")
var animals =  ["cat", "dog", "bird", "hedgehog", "moose", "elephant"]

function displayGifs(){
    $("#animal-view").empty();

    var animal= $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    animal + "&api_key=dNqbwZCIrr8ljTJlqyvfF9la5aNT5woE&limit=10"
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){

        var results = response.data;
        for(var i=0; i<results.length; i++){
        var animalDiv = $("<div class='animal'>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#animal-view").prepend(animalDiv);
    
    }
    });
}



function renderButtons(){

    $("#buttons-view").empty();
    for( var i = 0; i<animals.length; i++){
        var btn =$("<button>");
        btn.addClass("animal-btn");
        btn.attr("data-name", animals[i]);
        btn.text(animals[i]);
        $("#buttons-view").append(btn);
    }
}

$("#add-animal").on("click", function(event){
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
    
});

$(document).on("click", ".animal-btn", displayGifs);
renderButtons();