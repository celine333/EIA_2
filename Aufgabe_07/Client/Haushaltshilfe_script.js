"use strict";
var L07_Homehelper;
(function (L07_Homehelper) {
    window.addEventListener("load", handleLoad);
    // let appurl: string = "https://celineoverdose.herokuapp.com/";
    let appurl = "http://localhost:5001";
    let form = document.querySelector("#orderForm");
    async function handleLoad(_event) {
        console.log("Die Anwendung startet");
        let response = await fetch("Data.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        L07_Homehelper.generateContent(data);
        let handleform = document.querySelector("#orderForm");
        handleform.addEventListener("change", handleChange);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
        let submit = document.querySelector("button[type=button]");
        console.log(submit);
        submit.addEventListener("click", sendOrder);
        let reset = document.querySelector("button[type=reset]");
        reset.addEventListener("click", resetOrder);
    }
    async function sendOrder(_event) {
        console.log("send order");
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        console.log("Query:" + query);
        // await fetch("Haushaltshilfe_L06.html?" + query.toString());
        let response = await fetch(appurl + "?" + query.toString());
        let ordercontent = await response.text();
        alert("Order sent!");
        alert("Your order contains:" + ordercontent);
    }
    function handleChange(_event) {
        displayOrder(_event);
    }
    function displayOrder(_event) {
        let formData = new FormData(document.forms[0]);
        let list = document.querySelector("#list");
        list.innerHTML = "";
        let totalprice = 0;
        for (let entry of formData) {
            console.log("Entry:" + entry);
            // debugger;
            let portion = Number(formData.get("Menge"));
            let item;
            let price;
            switch (entry[0]) {
                case "Einkauf":
                    if (portion > 0) {
                        item = document.querySelector("[value='" + entry[1] + "']");
                        price = Number(item.getAttribute("price"));
                        console.log("Item:" + item);
                        console.log("list:" + list);
                        list.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                        let unit = String(item.getAttribute("unit"));
                        console.log("unit:" + unit);
                        list.innerHTML += "" + unit + ":" + portion + " " + "bei";
                        console.log("price:" + price);
                        totalprice += price * portion;
                    }
                    break;
                case "Supermarkt":
                    if (portion > 0) {
                        list.innerHTML += " " + entry[1];
                    }
                    break;
                case "Haushalt":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    console.log("Price:" + price);
                    list.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " " + "<br>";
                    totalprice += price;
                    break;
                case "Bank":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += ":" + " " + entry[1] + " " + price + "€";
                    totalprice += price;
                    break;
                case "Amount":
                    let radio = document.querySelector("#radio");
                    if (radio.checked) {
                        list.innerHTML += " " + entry[1] + "€";
                    }
                    break;
                case "Zahlung":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    let payment = document.querySelector("#payment");
                    totalprice += price;
                    payment.innerHTML = "<br>" + "" + entry[1] + ":" + " " + totalprice.toFixed(2) + "€";
                    console.log("Preis:" + totalprice);
                    break;
            }
        }
    }
    function displayAmount(_event) {
        let value = _event.target.value;
        let text = document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }
    function resetOrder(_event) {
        let list = document.querySelector("#list");
        list.innerHTML = "";
        let payment = document.querySelector("#payment");
        payment.innerHTML = "";
    }
})(L07_Homehelper || (L07_Homehelper = {}));
//# sourceMappingURL=Haushaltshilfe_script.js.map