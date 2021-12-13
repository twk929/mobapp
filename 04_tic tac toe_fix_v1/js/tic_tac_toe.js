"use strict";

//flagがpen-flagのときpenguinsのターン、bear-flagのときのターン

let flag = "pen-flag";


let counter= 9;

const squares = document.querySelectorAll(".square");

const squaresArray = Array.prototype.slice.call(squares);


const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//get NewGame button

//win or lose judgement line

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


//message

const msgtxt1 = '<p class ="image"> <img src = "img/penguin.png" width 61px height = 61px ></p><p class="text1"> Penguins Attack !</p>'
const msgtxt2 = '<p class ="image"> <img src = "img/whitebear.png" width 61px height = 61px ></p><p class="text2"> GoldBear Attack !</p>'
const msgtxt3 = '<p class ="image"> <img src = "img/penguin.png" width 61px height = 61px ></p><p class="text animate_animated animate_lightSpeedInRight"> Penguins Win !</p>'
const msgtxt4 = '<p class ="image"> <img src = "img/whitebear.png" width 61px height = 61px ></p><p class="text animate_animated animate_lightSpeedInRight"> GoldBear Win !</p>'
const msgtxt5 = '<p class ="image"> <img src = "img/whitebear.png" width 61px height = 61px ><img src = "img/penguin.png" width 61px height = 61px ></p><p class="text animate_bounseIn"> Draw !!! </p>'

function JudgeLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}


window.addEventListener("DOMContentLoaded",
    function() {
        setMessage("pen-turn");
    }, false
);

a_1.addEventListener("click",
    function(e){
        isSelect(a_1);
    }
);

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


function isSelect(selectSquare) {

    if (flag==="pen-flag") {
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");

        //penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win");
            return;
        }
        setMessage("bear-turn");
        flag = "bear-flag";

    } else {
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");

        //gold-bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            return;
        }
        setMessage("pen-turn");
        flag = "pen-flag";
}

    counter--;

    if (counter === 0) {
        setMessage("draw");
    }
}


function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every (function(square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            } else 
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) {winningLine = line}
        return subResult;
    });
    return result;
}


function setMessage (id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            /*let clickSound1 = new Audio ("./audio/click_sound1.mp3");
            clickSound1.play ();    */
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            window.setTimeout(function(){location.reload()},3000);
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            window.setTimeout(function(){location.reload()},3000);
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            window.setTimeout(function(){location.reload()},3000);
            break;
        default:
            document.getElementById("msgtxt").innerHTML=msgtxt1;
    }
}


