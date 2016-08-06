$(document).ready(function (){

//CREATE YOUR VARIABLES
var heroes = ['Black Widow', 'She-Hulk', 'Storm','Wonder Woman', 'Ant Man', 'Batgirl', 'Daredevil', 'Aquaman', 'Thor', 'Hulk'];

//FUNCTIONS
//GENERIC FUNCTION FOR DISPLAYING DATA

function renderButtons(){
    $('#buttonsView').empty(); //DELETES THE IMAGES PRIOR TO ADDING NEW ONES

//CREATE BUTTONS FROM THE TOPICS ARRAY 

    for(var i = 0; i < heroes.length; i++){
        var b = $('<button>'); //JQUERY NEEDS TO CREATE THE BEGINNING AND END TAG
        b.addClass('hero'); //ADDED A CLASS
        b.attr('data-name', heroes[i]);//ADDED A DATA-ATTRIBUTE
        b.text(heroes[i]); //INITIAL BUTTON TEXT
        b.attr('data-state', $(this).attr('data-state', 'animate'));
        $('#buttonsView').append(b);//ADDS THE BUTTON TO THE HTML
    }
}

$('#addHero').on('click', function(){ //HANDLES EVENTS WHERE ONE BUTTON IS CLICKED
    var hero = $('#hero-input').val().trim(); //GRABS THE INPUT FROM THE TEXTBOX
    heroes.push(hero); //TEXTBOX IS THEN ADDED TO OUR ARRAY
    renderButtons(); //HANDLES THE PROCESSING OF OUR HEROS ARRAY
    return false; //USER IS ABLE TO HIT ENTER INSTEAD OF CLICK 

});
renderButtons();

$(document).on('click', '.hero', function(){
    var hero = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10";
    

//AJAX CALL TO THE API     
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response){
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        $('#gifsAppearHere').empty();
        for(var i = 0; i < results.length; i++){ //CREATE BUTTONS FROM THE TOPICS ARRAY
            var heroDiv = $('<div id="heroDiv">');
            var p = $('<p>').text("Rating: " + results[i].rating);
            var heroImage = $('<img>');
            heroImage.attr('src', results[i].images.fixed_height_still.url);
            heroImage.attr('data-still', results[i].images.fixed_height_still.url);
            heroImage.attr('data-animate', results[i].images.fixed_height.url);
            heroImage.attr('class', 'heroImage');
            heroImage.attr('data-state', 'still');
            heroDiv.append(p);
            heroDiv.append(heroImage);
            $('#gifsAppearHere').append(heroDiv);
        }

    });
//CAPTURE BUTTON CLICK HERE ON THE IMAGES
    $(document).on('click', '.heroImage', function(){
            var state = $(this).attr('data-state');
            if(state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
                console.log(this);
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
                console.log(this);
            }

    });

});

});