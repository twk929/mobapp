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
const omikujiText = document.getElementById("omikujiText");
btn1.addEventListener("click",
   function() {
      let resultText = ["大吉❣❣❣","吉!!!!","中吉!!","小吉❕"];
      let resultColor = ["#FF0000","#ffe900","#ff9900","#73434a"];
      let resultFontSize = ["70px","65px","55px","30px"];
      let resultMaxSpeed = [5,4,3,2];
      let resultMaxSize = [38,34,30,20];
      let resultImage = ["img/lily.gif","img/star.gif","img/leaf.gif","img/bubble.png"];
      let resultSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound4.mp3"];
      let n = Math.floor(Math.random() * resultText.length);
      omikujiText.textContent = resultText [n];
      omikujiText.style.color = resultColor [n];
      omikujiText.style.fontSize = resultFontSize [n];
      let music = new Audio(resultSound[n]);
      music.currentTime = 0;
      music.play();

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
