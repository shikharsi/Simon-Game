var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;
function nextSequence(){
    userClickedPattern = [];
    var n=Math.floor((Math.random()*10)%4);
    console.log(n);
    var randomChosenColour=buttonColours[n];
    level++;
    $("#level-title").text("Level "+level);
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ 
        $("#"+currentColour).removeClass("pressed");
     }, 100);
}

$(document).keydown(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start= true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart...");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

    function startOver() {
        level = 0;
        gamePattern = [];
        start = false;
    }