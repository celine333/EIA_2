var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    // ausgwählte Farbe zum Füllen
    var selectedcolor = "#ff0000";
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        // Klick auf Farbe
        document.querySelector("#paletteid").addEventListener("click", setColor);
        document.querySelector("#red").addEventListener("click", setColor);
        document.querySelector("#blue").addEventListener("click", setColor);
        document.querySelector("#green").addEventListener("click", setColor);
        document.querySelector("#yellow").addEventListener("click", setColor);
        // Klick auf Regel Button
        document.querySelector("#rules").addEventListener("click", rulesVisibility);
        // Klick auf Canvas Größe
        document.querySelector("#standard").addEventListener("click", handleCanvasSize);
        document.querySelector("#small").addEventListener("click", handleCanvasSize);
        document.querySelector("#medium").addEventListener("click", handleCanvasSize);
        document.querySelector("#large").addEventListener("click", handleCanvasSize);
        document.querySelector("#generate").addEventListener("click", generateSymbols);
    }
    function rulesVisibility() {
        console.log("show rules");
        var rulesdiv = document.querySelector("#overlay");
        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        }
        else {
            rulesdiv.style.display = "none";
        }
    }
    function handleCanvasSize() {
        var standardsize = document.querySelector("#standard");
        var smallsize = document.querySelector("#small");
        var mediumsize = document.querySelector("#medium");
        var largesize = document.querySelector("#large");
        var canvas = document.querySelector("canvas");
        if (standardsize.checked == true) {
            canvas.setAttribute("style", "width: 500px");
            canvas.setAttribute("style", "height: 300px");
            console.log("standard");
        }
        if (smallsize.checked == true) {
            console.log("small");
            canvas.setAttribute("style", "width: 450px");
            canvas.setAttribute("style", "height: 250px");
        }
        if (mediumsize.checked == true) {
            canvas.setAttribute("style", "width: 550px");
            canvas.setAttribute("style", "height: 350px");
        }
        if (largesize.checked == true) {
            canvas.setAttribute("style", "width: 600px");
            canvas.setAttribute("style", "height: 400px");
        }
    }
    function generateSymbols(_event) {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde
        // neues Element kreieren
        // let element: canvasElement = new canvasElement();
        // Kreis ------------------------------
        var r = 4;
        MagicCanvas.crc2.save();
        MagicCanvas.crc2.translate(40, 40);
        // Skalierung vertikal und horizontal
        MagicCanvas.crc2.scale(5, 5);
        // crc2.translate(-50, -50);
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.arc(0, 0, r, 0, 2 * Math.PI);
        MagicCanvas.crc2.closePath();
        MagicCanvas.crc2.restore();
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
        // Dreieck
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.moveTo(70, 70);
        MagicCanvas.crc2.lineTo(10, 70);
        MagicCanvas.crc2.lineTo(10, 25);
        MagicCanvas.crc2.closePath();
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
        //Rectangle
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.rect(10, 10, 55, 40);
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
        // Flash
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.translate(40, 40);
        MagicCanvas.crc2.moveTo(0, 0);
        MagicCanvas.crc2.lineTo(20, 0);
        MagicCanvas.crc2.lineTo(15, 25);
        MagicCanvas.crc2.lineTo(25, 25);
        MagicCanvas.crc2.lineTo(10, 50);
        MagicCanvas.crc2.moveTo(0, 0);
        MagicCanvas.crc2.lineTo(0, 30);
        MagicCanvas.crc2.lineTo(12, 30);
        MagicCanvas.crc2.lineTo(10, 50);
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
    }
    function setColor(event) {
        var actualid = event.target.getAttribute("id");
        if (actualid == "red") {
            selectedcolor = "#7F0909";
        }
        else if (actualid == "blue") {
            selectedcolor = "#000890";
        }
        else if (actualid == "green") {
            selectedcolor = "#0D6217";
        }
        else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
        }
        console.log("Event:" + event.target.getAttribute("id"));
    }
})(MagicCanvas || (MagicCanvas = {}));
// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
// Optional: alle Elemente hören sich auf zu bewegen während das neue ELement verschoben wird
//# sourceMappingURL=Main.js.map