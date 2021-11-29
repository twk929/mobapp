"use strict";

window.addEventListener("DOMContentLoaded",
    function() {

        if (typeof localStorage === "undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            savelocalStorage();
            delLocalStorage();
            selectTable();
            allClearLocalStorage();
        }
    }
);

//save
function savelocalStorage () {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key=="" || value=="") {
                let clickSound = new Audio ("./audio/wrng.wav");
                clickSound.play ();
                Swal.fire({
                    title: "<p id='swaltxt'>Memo App<p>",
                    html: "<p id='swaltxt'>Key, Memo はいずれも必須です。<p>",
                    type: "error",
                    background: '  url(./img/alert.jpg)',
                    allowOutsideClick : false,
                });
                return;
            } else {
                let w_msg = "<p id='swaltxt'>Local Storageに "+key+" の "+value+" を保存しますか？</p>";
                let clickSound = new Audio ("./audio/memo.wav");
                clickSound.play ();
                Swal.fire({
                    title: "<p id='swaltxt'>Memo App</p>",
                    html: w_msg ,
                    type: "question",
                    background: '  url(./img/sure.jpg)',
                    borderRadius: '2000px',
                    showCancelButton: true
                })

                .then(function(result) {
                    if (result.value===true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "<p id='swaltxt'>LocalStorageに " + key +  " の " + value + " を保存しました。</p>";
                        let clickSound = new Audio ("./audio/done.mp3");
                        clickSound.play ();  
                        Swal.fire({
                            title: "<p id='swaltxt'>Done<p>",
                            html: w_msg,
                            type: "success",
                            background: 'url(./img/ok.jpg)',
                            allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    } 
                });
            }
        }, false
    );
};
//delete
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");
            
            if(w_cnt >= 1){
                let w_msg = "<p id='swaltxt'>Local Storageから選択されている "+(w_cnt)+" 件を削除しますか？</p>";
                let clickSound = new Audio ("./audio/error.mp3");
                clickSound.play ();
                Swal.fire({
                    title: "<p id='swaltxt'>Memo App</p>",
                    html: w_msg ,
                    type: "question",
                    background: '  url(./img/warn.jpg)',
                    showCancelButton: true
                })
                .then(function(result) {
                    if (result.value===true) {
                        for(let i=0; i < chkbox1.length; i++) {
                            if(chkbox1[i].checked){
                                localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();
                        let w_msg = "<p id='swaltxt'>LocalStorageから " +(w_cnt)+ " 件を削除しました。</p>";
                        let clickSound = new Audio ("./audio/trash.mp3");
                        clickSound.play ();  
                        Swal.fire({
                            title: "<p id='swaltxt'>Done<p>",
                            html: w_msg,
                            type: "success",
                            background: '  url(./img/ok.jpg)',
                            allowOutsideClick: false
                        });
                    } 
                     document.getElementById("textKey").value = "";
                     document.getElementById("textMemo").value = "";
                });
            }
        }, false
    );
};

//deleteAll
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e) {
            e.preventDefault();
                let w_msg = "<p id='swaltxt'>LocalStorageのデータを全て削除しますか？</P>";
                let clickSound = new Audio ("./audio/error.mp3");
                clickSound.play ();
                Swal.fire({
                    title: "<p id='swaltxt'>Memo App<p>",
                    html: w_msg ,
                    type: "question",
                    background: '  url(./img/warn.jpg)',
                    showCancelButton: true
                })
                .then(function(result) {
                    if (result.value===true) {
                        localStorage.clear();
                        viewStorage();
                        let w_msg ="<p id='swaltxt'>LocalStorageのデータを全て削除しました。</P>";
                        let clickSound = new Audio ("./audio/trash.mp3");
                        clickSound.play ();  
                        Swal.fire({
                            title: "<p id='swaltxt'>Done<p>",
                            html: w_msg,
                            type: "success",
                            background: '  url(./img/ok.jpg)',
                            allowOutsideClick: false
                        }); 
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
        }, false
    );
};

//select
function selectTable () {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
};


//selectCheckBox
function selectCheckBox(mode) {
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textkey = "";
    let w_textmemo = "";

    for(let i=0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked){
            if(w_cnt === 0){
                w_textkey = table1.rows[i+1].cells[1].firstChild.data;
                w_textmemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textkey;
    document.getElementById("textMemo").value = w_textmemo;

    if(mode === "select"){
        if(w_cnt===1){
            let clickSound = new Audio ("./audio/select.mp3");
            clickSound.play ();
            return w_cnt;
        }else{
            let clickSound = new Audio ("./audio/wrng.wav");
            clickSound.play ();
            Swal.fire({
                title: "<p id='swaltxt'>Memo App",
                html: "<p id='swaltxt'>一つを選んでください!!!<p>",
                background: '  url(./img/alert.jpg)',
                type: "error",
                allowOutsideClick : false
            });
        }
    }

    if(mode==="del"){
        if(w_cnt >= 1){
            return w_cnt;
        }else{
            let clickSound = new Audio ("./audio/wrng.wav");
            clickSound.play ();
            Swal.fire({
                title: "<p id='swaltxt'>Memo App<p>",
                html: "<p id='swaltxt'>一つを選んでください!!!</p>",
                type: "error",
                background: '  url(./img/alert.jpg)',
                allowOutsideClick : false
            });            
        }
    }
};

function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);

    for(let i=0; i<localStorage.length; i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>" ;
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("#table1").trigger("update");
}



