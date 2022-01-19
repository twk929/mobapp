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

//get class="level"

const levels = document.querySelectorAll(".level");

//Array に変換…もしline28でgetEelementsByClassNameを使う場合は、ForEachが使えないのでArrayに変換すること。
const levelsArray = Array.from(levels);

//levelの要素を取得レベル設定エリア

const level_1 = document.getElementById("level_1");
const level_2 = document.getElementById("level_2");
const level_3 = document.getElementById("level_3");

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

const lineRandom = cornerLine(squaresArray, ["a_1","a_3","c_1","c_3"]);

let winningLine = null;


//display messages (use switch to call)
const msgtxt1 = '<p class ="image"> <img src = "img/penguin.png" width 70px height = 70px ></p><p class="text1"> Penguins Attack ! <br> (Your Turn)</p>'
const msgtxt2 = '<p class ="image"> <img src = "img/whitebear.png" width 70px height = 70px ></p><p class="text2"> GoldBear Attack ! <br> (Computer Turn)</p>'
const msgtxt3 = '<p class ="image"> <img src = "img/penguin.png" width 70px height = 70px ></p><p class="text animate__animated animate__lightSpeedInLeft"> Penguins Win !</p>'
const msgtxt4 = '<p class ="image"> <img src = "img/whitebear.png" width 70px height = 70px ></p><p class="text animate__animated animate__lightSpeedInRight">GoldBear Win !</p>'
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
        squaresArray.forEach(function (square){
            square.classList.add("js-clickable");
        });
        
        LevelSetting (0); //Set level as Level 1

    }, false
);


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Level Settings
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let index;
levelsArray.forEach((level) => {
    level.addEventListener("click", () => {
        index = [].slice.call(levelsArray).indexOf(level);
        LevelSetting(index);
    });
});

function LevelSetting(index) {
    level_1.classList.remove("level-selected"); 
    level_1.classList.remove("level-non-selected"); 
    level_2.classList.remove("level-selected"); 
    level_2.classList.remove("level-non-selected"); 
    level_3.classList.remove("level-selected"); 
    level_3.classList.remove("level-non-selected");  


if(sessionStorage.getItem("tic_tac_toe_access")) {
    switch (index) {
        case 0:
            sessionStorage.setItem("tic_tac_toe_access","1");
            level_1.classList.add("level-selected");
            level_2.classList.add("level-non-selected");
            level_3.classList.add("level-non-selected");
            break;
        case 1:
            sessionStorage.setItem("tic_tac_toe_access","2");
            level_1.classList.add("level-non-selected");
            level_2.classList.add("level-selected");
            level_3.classList.add("level-non-selected");
            break;
        case 2:
            sessionStorage.setItem("tic_tac_toe_access","3");
            level_1.classList.add("level-non-selected");
            level_2.classList.add("level-non-selected");
            level_3.classList.add("level-selected");
            break;
        default:
            level_1.classList.add("level-selected");
            level_2.classList.add("level-non-selected");
            level_3.classList.add("level-non-selected");
            break;
        }
    } else {
        sessionStorage.setItem("tic_tac_toe_access","1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
    }
}



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//catching even when click square
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//call Penguins or bear when click the square and lock

squaresArray.forEach(function (square){
    square.addEventListener('click', () => {

        if (counter === 9) {
            const levelBox = document.getElementById("levelBox");
            levelBox.classList.add("js-unclickable");
        }

        let gameOverFlg = isSelect(square);

        //if not Game Over => Automatically bear comesout

        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");

            setTimeout(
                function () {
                    bearTurn ();
                },
                "1000" //waiting time
            );
        }
    });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//corner Line を　配列化
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//use filter
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
function cornerLine (targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]|| e.id === idArray[3]);
    });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//shows penguins clicked square
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function isSelect(selectSquare) {

    let gameOverFlg = "0";
    if (flag ==="pen-flag") {
        //click sounds
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); // repeat the sound

        selectSquare.classList.add("js-pen-checked"); //shows penguin in clicked squre
        selectSquare.classList.add("js-unclickable");  //locked clicked square
        selectSquare.classList.remove("js-clickable");  //remove locked clicked square


//call win or lose

        //if penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
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
        selectSquare.classList.remove("js-clickable");        

        //if gold-bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear")
            return gameOverFlg ="1";
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
        return gameOverFlg ="1";
    }
    return gameOverFlg ="0";
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
    //squaresArray.forEach(function (square){
    //    square.classList.add("js-unclickable");
    //});
    squaresBox.classList.add("js-unclickable");
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
        square.classList.add("js-clickable");
    });
        squaresBox.classList.remove("js-unclickable"); 
        levelBox.classList.remove("js-unclickable");

        //display the button   
        setMessage("pen-turn");
        newgamebtn_display.classList.add("js-hidden");

        //stop the snowfall 
        $(document).snowfall("clear");
    });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Logic for Bear Turn (PC) 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function bearTurn() {
    let level = sessionStorage.getItem("tic_tac_toe_access");
    let bearTurnEnd= "0";
    let gameOverFlg = "0"; //game over flag set to 0 
    while(bearTurnEnd === "0") {
        if(level === "1" ||level === "2" || level==="3") {
            //check the bears reach row (attack by Computer)
            bearTurnEnd = isReach("bear");
            if(bearTurnEnd === "1") { //when its availabe bear row then its end
                gameOverFlg = "1";
                break; //end of while 
            }
        }
        if(level === "2" || level==="3") {
            //check the penguins reach row (Defence the bear)
            bearTurnEnd = isReach("penguins");
            if(bearTurnEnd === "1") {
                break; // end of while
            }
        }

        if(level === "2" || level=== "3") {
            if(b_2.classList.contains("js-clickable")){
                gameOverFlg =isSelect(b_2);
                bearTurnEnd ="1";
                break;
            }
        }

        if(level === "3") {
            for (let square of lineRandom) {
                if (square.classList.contains("js-clickable")) {
                    gameOverFlg = isSelect(square);
                    bearTurnEnd = "1";
                    break;
                }
            }
            if(bearTurnEnd === "1") break;
        }
    

    const bearSquare = squaresArray.filter(function(square){ //get selectable squares for Bear
        return square.classList.contains("js-clickable");
    });
//check https://github.com/twk929/mobapp/blob/main/01_omikuji3/js/omikuji.js
        let n= Math.floor(Math.random()* bearSquare.length);
        gameOverFlg = isSelect(bearSquare[n]);
        break; //end of while  
    }
        if (gameOverFlg === "0") { 
            squaresBox.classList.remove("js-unclickable");
        
    }

}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Find the Reach Row 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function isReach (status) {
    let bearTurnEnd = "0"; //when bear turn => "1" then End

    lineArray.some (function (line){
        let bearCheckCnt = 0;
        let penCheckCnt = 0;

        line.forEach(function (square){
            if(square.classList.contains("js-bear-checked")) {
                bearCheckCnt++;
            } if(square.classList.contains("js-pen-checked")) {
                penCheckCnt++;
            }
        });
        //when its find bear reach row, there is a bear reach row
        if(status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0){
            bearTurnEnd = "1"; //there is a bear reach row
        }
        
        //when its find penguins reach row, there is a penguin reach row
        if(status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            bearTurnEnd = "1"; //there is a penguin reach row 
        }

        if(bearTurnEnd === "1") {
            line.some(function (square) {
                if (square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }
    });
    return bearTurnEnd;
}    