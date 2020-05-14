"use strict";
var L03_Homehelper;
(function (L03_Homehelper) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Die Anwendung startet");
        let order = document.querySelector("#form");
        order.addEventListener("change", displayOrder);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
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
            if (entry[0] == "Datalist") {
                let portion = Number(formData.get("Menge"));
                let price = Number(item.getAttribute("price"));
                order.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                let unit = String(item.getAttribute("unit"));
                console.log("unit:" + unit);
                order.innerHTML += "" + unit + ":";
            }
            else if (entry[0] == "Menge") {
                let portion = Number(formData.get("Menge"));
                order.innerHTML += "" + portion + "|";
            }
            else if (entry[0] == "DatalistSupermarkt") {
                order.innerHTML += " " + entry[1];
            }
            else if (entry[0] == "Home") {
                let price = Number(item.getAttribute("price"));
                order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " ";
            }
            else if (entry[0] == "Bank") {
                let price = Number(item.getAttribute("price"));
                order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + "|";
            }
            else if (entry[0] == "Amount") {
                order.innerHTML += " " + entry[1] + "€";
            }
            else if (entry[0] == "cash") {
                order.innerHTML += "<br>" + "" + entry[1];
            }
            else {
                console.log("default");
            }
        }
    }
})(L03_Homehelper || (L03_Homehelper = {}));
//# sourceMappingURL=Haushaltshilfe_script.js.map