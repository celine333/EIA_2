"use strict";
var L04_Homehelper;
(function (L04_Homehelper) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Die Anwendung startet");
        let order = document.querySelector("#form");
        order.addEventListener("change", displayOrder);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
        L04_Homehelper.generateContent(L04_Homehelper.data);
    }
    function displayAmount(_event) {
        let value = _event.target.value;
        let text = document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }
    function displayOrder(_event) {
        let order = document.querySelector("#list");
        order.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            console.log("Entry:" + entry);
            let item = document.querySelector("[value='" + entry[1] + "']");
            let portion = Number(formData.get("Menge"));
            let price = Number(item.getAttribute("price"));
            switch (entry[0]) {
                case "Einkauf":
                    order.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                    let unit = String(item.getAttribute("unit"));
                    console.log("unit:" + unit);
                    order.innerHTML += "" + unit + ":";
                    console.log("price:" + price);
                    break;
                case "Menge":
                    order.innerHTML += "" + portion + "|";
                    break;
                case "Supermarkt":
                    order.innerHTML += " " + entry[1];
                    break;
                case "Haushalt":
                    order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " ";
                    break;
                case "Bank":
                    order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + "|";
                    break;
                case "Amount":
                    order.innerHTML += " " + entry[1] + "€";
                    break;
                case "Zahlung":
                    order.innerHTML += "<br>" + "" + entry[1];
                    break;
            }
        }
    }
})(L04_Homehelper || (L04_Homehelper = {}));
//# sourceMappingURL=Haushaltshilfe_script.js.map