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
                swal("Key, Memoはいずれも必須です。");
                return;
            } else {
                swal({
                    title: "Are you sure?",
                    text: "Local Storageに "+key+" の "+value+"\nを保存しますか？",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willSave) => {
                    if (willSave) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        swal("LocalStorageに " + key +  " " + value + " を保存しました。", {
                            icon: "success",
                        });

                    } else {
                        swal("保存を避けました!!!");
                    }
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
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
            let w_sel = "0";
            w_sel = selectCheckBox();
            if(w_sel === "1"){
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                swal({
                    title: "Are you sure?",
                    text: "Local Storageに "+key+" の "+value+"\nを削除しますか",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        localStorage.removeItem(key);
                        viewStorage();
                        swal("LocalStorageに " + key +  "  " + value + " を削除しました。", {
                            icon: "success",
                        });
                    } else {
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
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
                swal({
                    title: "Are you sure?",
                    text: "LocalStorageのデータを全て削除しますか？",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willAllDel)=>{
                    if(willAllDel){
                        localStorage.clear();
                        viewStorage();
                        swal("LocalStorageのデータを全て削除しました。",{
                            icon: "success",
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
            selectCheckBox();
        }, false
    );
};


//selectCheckBox
function selectCheckBox() {
    let w_sel = "0";
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
    if(w_cnt===1){
        return w_sel="1";
    }else{
        swal("一つを選んでください!!!");
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



