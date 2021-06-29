"use strict";

window.addEventListener("DOMContentLoaded",
   function() {

      $("header").textillate({
         loop: false, // ループのオンオフ
         minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
         initialDelay: 2000, // 遅延時間
         autoStart: true, // アニメーションを自動的にスタート
         in: { // フェードインのエフェクトの詳細設定
            effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
            delayScale: 1.5, // 遅延時間の指数
            delay: 50, // 文字ごとの遅延時間
            sync: false, // trueはアニメーションをすべての文字に同時に適用
            shuffle: true // trueは文字を順番にではなく、ランダムに
         }
      });
         // おみくじボタン(id="btn1") ボヤァと表示させる
      $(function(){
         ScrollReveal().reveal("#btn1", { duration: 9000 });
      });
      
      setTimeout( 
         function () {
            let popMessage="いらっしゃい!!!  Welcome to Omikuji !!! おみくじ引いてって！！！";
            window.alert(popMessage);
         }, 
         "5000"
      );
   }, false
);

const btn1 = document.getElementById("btn1");
btn1.addEventListener("click",
   function() {
      // let n = Math.floor(Math.random() *3);
      // switch (n) {
      //    case 0:
      //       btn1.textContent="Happy";
      //       btn1.style.color="#faebd7";
      //       btn1.style.fontSize="30px";
      //       btn1.style.backgroundColor="#00bfff"; 
      //       break;
      //    case 1:
      //       btn1.textContent="VeryHappy";
      //       btn1.style.color="#ffff00";
      //       btn1.style.fontSize="45px";
      //       btn1.style.backgroundColor="#8a2be2";
      //       break;
      //    case 2:
      //       btn1.textContent="unHappy";
      //       btn1.style.color="#000000";
      //       btn1.style.fontSize="20px";
      //       btn1.style.backgroundColor="#e6e6fa";
      //       break;
      // }

      let resultText = ["大吉❣❣❣","吉!!!","中吉!!","小吉❕"];
      let resultColor = ["#f5f5f5","#f5f5f5","#191970","#000000"];
      let resultFontSize = ["45px","40px","30px","20px"];
      let resultBackgroundColor =["#9400d3","#00bfff","#ffff00","#fffacd"];
      let resultMaxSpeed = [5,4,3,2];
      let resultMaxSize = [45,40,40,20];
      let resultImage = ["img/lily.gif","img/star.gif","img/leaf.gif","img/bubble.png"];
      let n = Math.floor(Math.random() * resultText.length);
      btn1.textContent = resultText [n];
      btn1.style.color = resultColor [n];
      btn1.style.fontSize = resultFontSize [n];
      btn1.style.backgroundColor = resultBackgroundColor [n];

      $(document).snowfall("clear");
      // jQueryのsnowfall
      $(document).ready(function(){
         $(document).snowfall({
            maxSpeed : resultMaxSpeed [n], // 最大速度
            minSpeed : 1, // 最小速度
            maxSize : resultMaxSize [n], // 最大サイズ
            minSize : 1, // 最小サイズ
            image : resultImage [n],
         });
      });
   }, false
);