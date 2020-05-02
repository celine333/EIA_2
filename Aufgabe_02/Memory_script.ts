// verschiedene Seitenansichten 
let startingpage: HTMLDivElement;
let playingpage: HTMLDivElement;

// Daten speichern
// interface Cards {
//     letter: string;
//     clicked: boolean;
// }

let sequencearray: string[] = [];
let timearray: any[] = [];

window.addEventListener ("load", handleLoad);

function handleLoad (_event: Event): void {
    startingpage = document.querySelector("#startingpage");
    playingpage = document.querySelector("#playingpage");
    // die Startseite soll als erstes angezeigt werden 
    showactivediv("start"); 
    // Daten speichern
    let savebutton: HTMLElement = <HTMLElement>document.querySelector("#save");
    savebutton.addEventListener("click", SaveData); 
    // Spiel starten
    let startbutton: HTMLElement = <HTMLElement>document.querySelector("#button");
    startbutton.addEventListener("click", StartGame);

    let select: HTMLElement = <HTMLElement>document.querySelector("#select");
    select.addEventListener("click", SelectSequence);
}

// Bestimmt welche Seite angezeigt wird 
function showactivediv(activediv: string): void {
    console.log("showactivediv:" + activediv);
    if (activediv == "start") {
        startingpage.setAttribute("style", "display: block");
        playingpage.setAttribute("style", "display: none");
    } else if (activediv == "play") {
        startingpage.setAttribute("style", "display: none");
        playingpage.setAttribute("style", "display: block");
    } 
}

function SelectSequence (_event: Event): void {
    console.log("get value");
    let selected: HTMLInputElement = <HTMLInputElement>document.querySelector("#select");
    let output = selected.value;
    console.log(output);
    sequencearray.push(output);
    // Array wird nochmal geleert und neu befüllt
    sequencearray = [];
    sequencearray.push(output);
    console.log(sequencearray);
}
 
function SaveData (_event: Event): void {
    console.log("Daten werden gespeichert");
    // Eingabe Feld speichern
    let valueinput = document.querySelector("input").value;
    sequencearray.push(valueinput);
    console.log(sequencearray);
    // Zeit Feld speichern
    let time = document.querySelector("input");
    let valuetime = time.valueAsDate;
    // let currentTime = Date.get + ":" + Date.getMinutes();
    timearray.push(valuetime);
    console.log(valuetime);

}

function ShuffleCards (_event: Event): void {
    // Array zu einem String wandeln
    let change = sequencearray.toString();
    console.log("zeig:" + change);
    // Das Wort in einzelne Buchstaben aufteilen
    change.split(" ");
    let i: number = 0;
    for (i = 0; i < change.length + 1; i++) {
        let letter = change[i];
        console.log(change[i]);
    }
    // Buchstaben mischen
    for (i = 0; i < change.length; i++) {
        let randomValue = change[Math.floor(change.length * Math.random())];
        
        console.log(randomValue);
        // let tradeobject = change[i]; 
        // randomValue = change[i];
        // tradeobject = randomValue
        let addcard: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        addcard.innerHTML = randomValue;
        document.querySelector("#mail").appendChild(addcard);
        addcard.setAttribute("style", "background-color: white");
        addcard.setAttribute("style", "height: 20px, width: 10px");

        console.log(addcard);
    } 
    // let positionCard: number = 15 + (70 / (change.length) * i);
    // document.querySelector(".card").setAttribute("style", "left: " + positionCard + "%");
}

function StartGame (_event: Event): void {
    showactivediv("play");
    ShuffleCards(event);   
}

function ShowCards (_event: Event): void {
    console.log("Karte wurde ausgewählt");
}

function PressKey (_event: Event): void {
    console.log("Diese Funktion ist für den Joker");
}

