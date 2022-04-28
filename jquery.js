var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits=["apple","banana","grapes","mango","orange","pear","strawberry","watermeoln"];
$(function(){
  // click start reset button
  $("#startreset").click(function(){
    // are we playing?
    // yes
    if(playing == true){
      // reload page
      location.reload();
    }
    // no
    else{
      playing = true; // game initated
      //set score to zero
      score = 0;
      $("#scorevalue").html(score);
      // show trials left
      $("#trailsleft").show();
      trailsleft = 3;
      $("#gameOver").hide();
      addhearts();
      //change button text to "reset game"
      $("#startreset").html("Reset");
      startaction();
    }
  })

  $("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    clearInterval(action);
    $("#fruit1").hide("explode",500);
    setTimeout(startaction,500);
  });


function addhearts(){
  $("#trailsleft").empty();
  for(i=0;i<trailsleft;i++){
    $("#trailsleft").append("<img src=heart.png class=lifes>");
  }
}

function startaction(){
  $("#fruit1").show();
  choosefruit();
  $("#fruit1").css({
    'top':-50,
    'left':Math.round(550*Math.random())
  })
  //2.define a random step
  step = 1 + Math.round(5*Math.random());
  // addhearts();
  //3.move fruit down 1 step every 30 sec
  action = setInterval(function(){
  $("#fruit1").css("top",$("#fruit1").position().top += step);
    //is fruit too low?
    if($("#fruit1").position().top > $("#fruitcontainer").height()){
      if(trailsleft > 1){
        $("#fruit1").show();
        choosefruit();
        $("#fruit1").css({
          'top':-50,
          'left':Math.round(550*Math.random())
        })
        step = 1 + Math.round(5*Math.random());
        trailsleft --;
        addhearts();
      }
      else{
        //gameover
        $("#trailsleft").hide();
        playing = false;
        $("#startreset").html("Start Game");
        $("#gameOver").show();
        $("#gameOver").html('<p>Game Over!</p><p>Your score is '+score+' </p>');
        stopaction();
      }
    }
  },10)

}

function choosefruit(){
  //1.Create 1 random Fruits
  $("#fruitcontainer").css("background-color","white");
  $("#fruit1").attr('src',fruits[Math.round(8*Math.random())]+'.png');
}

function stopaction(){
  clearInterval(action);
  $("#fruit1").hide();
}
});
