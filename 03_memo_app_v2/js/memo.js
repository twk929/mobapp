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
                    title: "Memo App",
                    html: "Key, Memoはいずれも必須です。",
                    type: "error",
                    allowOutsideClick : false
                });
                return;
            } else {
                let w_msg = "Local Storageに "+key+" の "+value+" を保存しますか？";
                let clickSound = new Audio ("./audio/memo.wav");
                clickSound.play ();
                Swal.fire({
                    title: "Memo App",
                    html: w_msg ,
                    type: "question",
                    showCancelButton: true
                })
                .then(function(result) {
                    if (result.value===true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに " + key +  " の " + value + " を保存しました。";
                        Swal.fire({
                            title: "Done",
                            html: w_msg,
                            type: "success",
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
                let w_msg = "Local Storageから選択されている "+(w_cnt)+" 件を削除しますか？";
                let clickSound = new Audio ("./audio/error.mp3");
                clickSound.play ();
                Swal.fire({
                    title: "Memo App",
                    html: w_msg ,
                    type: "question",
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
                        let w_msg = "LocalStorageから " +(w_cnt)+ " 件を削除しました。";
                        let clickSound = new Audio ("./audio/trash.mp3");
                        clickSound.play ();
                        Swal.fire({
                            title: "Done",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                    } 
                     document.getElementById("textKey").value = "";
                     document.getElementById("textMemo").value = "";
                });
            }
        }, false
    );
//Version up (click trash icon and remove item in each raw)

const table1 = document.getElementById("table1");
table1.addEventListener("click", (e) => {
    if(e.target.classList.contains("trash") === true) {
        let parent = e.target.closest('td');
        let eprev = parent.previousElementSibling;
        let eprevprev = eprev.previousElementSibling;
        let key = eprevprev.firstChild.data;
        let value = eprev.firstChild.data;
        let w_delete = "localStorageから"+key+" の "+value+"を削除しますか？"; 
        let clickSound = new Audio ("./audio/error.mp3");
        clickSound.play ();
        Swal.fire({
            title : "Memo app",
            html : w_delete,
            type : "question",
            showCancelButton : true
        }).then(result => {
            if(result.value === true) {
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "localStorageから"+key+" の "+value+"を削除しました!"; 
                let clickSound = new Audio ("./audio/trash.mp3");
                clickSound.play ();
                Swal.fire({
                    title : "Memo app",
                    html : w_msg,
                    type : "success",
                    allowOutsideClick : false 
                });
                document.getElementById("textkey").value = " ";
                document.getElementById("textMemo").value=" ";
            }
        })

    }
});

};

//deleteAll
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e) {
            e.preventDefault();
                let w_msg = "LocalStorageのデータを全て削除しますか？";
                let clickSound = new Audio ("./audio/error.mp3");
                clickSound.play ();
                Swal.fire({
                    title: "Memo App",
                    html: w_msg ,
                    type: "question",
                    showCancelButton: true
                })
                .then(function(result) {
                    if (result.value===true) {
                        localStorage.clear();
                        viewStorage();
                        let w_msg ="LocalStorageのデータを全て削除しました。";
                        let clickSound = new Audio ("./audio/trash.mp3");
                        clickSound.play ();
                        Swal.fire({
                            title: "Done",
                            html: w_msg,
                            type: "success",
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
            return w_cnt;
        }else{
            let clickSound = new Audio ("./audio/wrng.wav");
            clickSound.play ();
            Swal.fire({
                title: "Memo App",
                html: "一つを選んでください!!!",
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
                title: "Memo App",
                html: "一つを選んでください!!!",
                type: "error",
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
        let td4 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>" ;
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src ='img/trash_icon.png' class='trash'>";
    }

    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("#table1").trigger("update");
}
