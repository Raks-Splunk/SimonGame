var start=0;
var level=1;
var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
function startover(){
    level=1;
    gamePattern=[];
    start=0;
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function nextSequence(){
    userClickedPattern=[];
    var randomnumber=Math.floor((Math.random()*4));
    var randomChosenColor=buttonColors[randomnumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(300).fadeIn(300);
    playSound(randomChosenColor);
    $("h1").html("Level "+level);
    level++;
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            console.log("sucess");
            setTimeout(function(){
                nextSequence();
            },1000);        
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startover();
        console.log("wrong");
    }
}
$(".btn").on("click",function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
$("body").keypress(function(){
    if(start==0){
        nextSequence();
    }
    start=1;
});
