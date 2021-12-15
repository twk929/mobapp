"use strict";

//if flag is pen-flag then Penguins, bear-flag bear

let flag = "pen-flag";

//turn counter(9 boxes)
let counter= 9;

//get square class from HTML
const squares = document.querySelectorAll(".square");

//get arrays from square
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const squaresArray = Array.prototype.slice.call(squares);

//get square from HTML into Js
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//get NewGame button (Step 5)
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");


//win or lose judgement line (Step 4)
const line1 = JudgeLine (squaresArray, ["a_1","a_2","a_3"]);
const line2 = JudgeLine (squaresArray, ["b_1","b_2","b_3"]);
const line3 = JudgeLine (squaresArray, ["c_1","c_2","c_3"]);
const line4 = JudgeLine (squaresArray, ["a_1","b_1","c_1"]);
const line5 = JudgeLine (squaresArray, ["a_2","b_2","c_2"]);
const line6 = JudgeLine (squaresArray, ["a_3","b_3","c_3"]);
const line7 = JudgeLine (squaresArray, ["a_1","b_2","c_3"]);
const line8 = JudgeLine (squaresArray, ["a_3","b_2","c_1"]);

const lineArray = [line1,line2,line3,line4,line5,line6,line7,line8];

let winningLine = null;


//display messages (use switch to call)
const msgtxt1 = '<p class ="image"> <img src = "img/penguin.png" width 70px height = 70px ></p><p class="text1"> Penguins Attack !</p>'
const msgtxt2 = '<p class ="image"> <img src = "img/whitebear.png" width 70px height = 70px ></p><p class="text2"> GoldBear Attack !</p>'
const msgtxt3 = '<p class ="image"> <img src = "img/penguin.png" width 70px height = 70px ></p><p class="text3"> Penguins Win !</p>'
const msgtxt4 = '<p class ="image"> <img src = "img/whitebear.png" width 70px height = 70px ></p><p class="text3"> GoldBear Win !</p>'
const msgtxt5 = '<p class ="image"> <img src = "img/whitebear.png" width 70px height = 70px ><img src = "img/penguin.png" width 70px height = 70px ></p><p class="text animate__bounceIn"> Draw !!! </p>'

//Audio array
let gameSound = ["audio/click_sound1.mp3","audio/click_sound2.mp3","audio/penwin_sound.mp3","audio/bearwin_sound.mp3","audio/draw_sound.mp3"];

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//win or lose judgement array 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//use filter
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
function JudgeLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}


//code to execute when page is loading (Because pen-turn in setMessage Penguins will begin the game)
window.addEventListener("DOMContentLoaded",
    function() {
        setMessage("pen-turn");
    }, false
);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//catching even when click square
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//call Penguins or bear when click the square and lock

//**old patern :
a_1.addEventListener("click",
    function(e){
        isSelect(a_1);
    }
);


//**new patern:
//function(e) { is coding as () =>
a_2.addEventListener("click", () => {
    isSelect(a_2);
});

a_3.addEventListener("click", () => {
    isSelect(a_3);
});

b_1.addEventListener("click", () => {
    isSelect(b_1);
});

b_2.addEventListener("click", () => {
    isSelect(b_2);
});

b_3.addEventListener("click", () => {
    isSelect(b_3);
});

c_1.addEventListener("click", () => {
    isSelect(c_1);
});

c_2.addEventListener("click", () => {
    isSelect(c_2);
});

c_3.addEventListener("click", () => {
    isSelect(c_3);
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//shows peng or bear and lock the clicked square
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function isSelect(selectSquare) {

    if (flag==="pen-flag") {
        //click sounds
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); // repeat the sound

        selectSquare.classList.add("js-pen-checked"); //shows penguin in clicked squre
        selectSquare.classList.add("js-unclickable");  //locked clicked square

//call win or lose

        //if penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return;
        }
        setMessage("bear-turn");
        flag = "bear-flag";

    } else {
        //click sounds
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play(); // repeat the sound

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");

        //if gold-bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear")
            return;
        }
        setMessage("pen-turn");
        flag = "pen-flag";
}

//counter goes -1 (counter = counter - 1)
    counter--;

//if turn count = 0 then draw
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
    }
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//win or lose
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function isWinner(symbol) {
    //some >> if one line (condition) meet then TRUE
    //every >>if all square (condition) meet then TRUE 
    const result = lineArray.some(function (line) {
        const subResult = line.every (function(square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            } else 
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });

        //assign winningLine into line that become TRUE 
        if (subResult) {winningLine = line}
        return subResult;
    });
    return result;
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Set Message
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//message display in HTML when attack and or bear/pen win or draw
function setMessage (id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtxt").innerHTML=msgtxt1;
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Game Over Function 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function gameOver (status) {
    //wk sounds
    let w_sound 
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio (w_sound);
    music.currentTime = 0;
    music.play();

    //all square unclickable
    squaresArray.forEach(function (square){
        square.classList.add("js-unclickable");
    });

    //display new game button (default hidden in HTML using class "js-hidden")
    newgamebtn_display.classList.remove("js-hidden");


    //win effects
    if(status==="penguins") {
        if(winningLine) {
            winningLine.forEach(function (square){
                square.classList.add("js-pen_highlight");
            });
        }
        //Snow animation
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });

    } else if (status==="bear") {
        if(winningLine) {
            winningLine.forEach(function (square){
                square.classList.add("js-bear_highlight");
            });
        }
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)",
            maxSpeed : 13,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//New Game Button Function 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

newgamebtn.addEventListener("click", () => {
    flag = "pen-flag";
    counter = 9;
    winningLine = null;

    //remove all functions    
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highlight");
        square.classList.remove("js-bear_highlight");

        //display the button   
        setMessage("pen-turn");
        newgamebtn_display.classList.add("js-hidden");

        //stop the snowfall 
        $(document).snowfall("clear");
    })
});
