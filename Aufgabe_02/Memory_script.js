// verschiedene Seitenansichten 
var startingpage;
var playingpage;
// Daten speichern
// interface Cards {
//     letter: string;
//     clicked: boolean;
// }
var sequencearray = [];
var timearray = [];
window.addEventListener("load", handleLoad);
function handleLoad(_event) {
    startingpage = document.querySelector("#startingpage");
    playingpage = document.querySelector("#playingpage");
    // die Startseite soll als erstes angezeigt werden 
    showactivediv("start");
    // Daten speichern
    var savebutton = document.querySelector("#save");
    savebutton.addEventListener("click", SaveData);
    // Spiel starten
    var startbutton = document.querySelector("#button");
    startbutton.addEventListener("click", StartGame);
    var select = document.querySelector("#select");
    select.addEventListener("click", SelectSequence);
}
// Bestimmt welche Seite angezeigt wird 
function showactivediv(activediv) {
    console.log("showactivediv:" + activediv);
    if (activediv == "start") {
        startingpage.setAttribute("style", "display: block");
        playingpage.setAttribute("style", "display: none");
    }
    else if (activediv == "play") {
        startingpage.setAttribute("style", "display: none");
        playingpage.setAttribute("style", "display: block");
    }
}
function SelectSequence(_event) {
    console.log("get value");
    var selected = document.querySelector("#select");
    var output = selected.value;
    console.log(output);
    sequencearray.push(output);
    // Array wird nochmal geleert und neu befüllt
    sequencearray = [];
    sequencearray.push(output);
    console.log(sequencearray);
}
function SaveData(_event) {
    console.log("Daten werden gespeichert");
    // Eingabe Feld speichern
    var valueinput = document.querySelector("input").value;
    sequencearray.push(valueinput);
    console.log(sequencearray);
    // Zeit Feld speichern
    var time = document.querySelector("input");
    var valuetime = time.valueAsDate;
    // let currentTime = Date.get + ":" + Date.getMinutes();
    timearray.push(valuetime);
    console.log(valuetime);
}
function ShuffleCards(_event) {
    // Array zu einem String wandeln
    var change = sequencearray.toString();
    console.log("zeig:" + change);
    // Das Wort in einzelne Buchstaben aufteilen
    change.split(" ");
    var i = 0;
    for (i = 0; i < change.length + 1; i++) {
        var letter = change[i];
        console.log(change[i]);
    }
    // Buchstaben mischen
    for (i = 0; i < change.length; i++) {
        var randomValue = change[Math.floor(change.length * Math.random())];
        console.log(randomValue);
        // let tradeobject = change[i]; 
        // randomValue = change[i];
        // tradeobject = randomValue
        var addcard = document.createElement("div");
        addcard.innerHTML = randomValue;
        document.querySelector("#mail").appendChild(addcard);
        addcard.setAttribute("style", "background-color: white");
        addcard.setAttribute("style", "height: 20px, width: 10px");
        console.log(addcard);
    }
    // let positionCard: number = 15 + (70 / (change.length) * i);
    // document.querySelector(".card").setAttribute("style", "left: " + positionCard + "%");
}
function StartGame(_event) {
    showactivediv("play");
    ShuffleCards(event);
}
function ShowCards(_event) {
    console.log("Karte wurde ausgewählt");
}
function PressKey(_event) {
    console.log("Diese Funktion ist für den Joker");
}
//# sourceMappingURL=Memory_script.js.map