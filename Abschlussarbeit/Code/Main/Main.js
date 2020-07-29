var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    // ausgwählte Farbe zum Füllen
    var selectedcolor = "#ff0000";
    var selectedform = "circle";
    var selectedanimation = "position";
    var symbols = [];
    var chosenName;
    // Ausprobieren
    // let canvasheight: number;
    // let canvaswidth: number;
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        // Klick auf Farbe
        document.querySelector("#red").addEventListener("click", setColor);
        document.querySelector("#blue").addEventListener("click", setColor);
        document.querySelector("#green").addEventListener("click", setColor);
        document.querySelector("#yellow").addEventListener("click", setColor);
        // Klick auf Regel Button
        document.querySelector("#rules").addEventListener("click", rulesVisibility);
        // Generate
        document.querySelector("#generate").addEventListener("click", generateSymbols);
        // Klick auf Canvas Größe
        document.querySelector("#standard").addEventListener("click", handleCanvasSize);
        document.querySelector("#small").addEventListener("click", handleCanvasSize);
        document.querySelector("#medium").addEventListener("click", handleCanvasSize);
        document.querySelector("#large").addEventListener("click", handleCanvasSize);
        // Delete Button, um den Canvas zu säubern
        document.querySelector("#delete").addEventListener("click", clearCanvas);
        // Name + Bild speichern
        document.querySelector("#save").addEventListener("click", savePicture);
        // Klick auf die verschiedenen Form Icons
        document.querySelector("#circleicon").addEventListener("click", setForm);
        document.querySelector("#triangleicon").addEventListener("click", setForm);
        document.querySelector("#squareicon").addEventListener("click", setForm);
        document.querySelector("#flashicon").addEventListener("click", setForm);
        // Klick auf die verschiedenen Animationsformen
        document.querySelector("#position").addEventListener("click", setAnimation);
        document.querySelector("#rotate").addEventListener("click", setAnimation);
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
        // Canvas sizes
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
        var element = new MagicCanvas.canvasElement(selectedform, selectedcolor, selectedanimation);
        symbols.push(element);
        element.draw();
    }
    function setColor(event) {
        // Element wird über das Event mit Hilfe der id geholt 
        var actualid = event.target.getAttribute("id");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
            // colorred.style.border = "solid #FF0000";
        }
        else if (actualid == "blue") {
            selectedcolor = "#000890";
            // colorblue.style.border = "solid #FF0000";
        }
        else if (actualid == "green") {
            selectedcolor = "#0D6217";
        }
        else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
        }
        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }
    function setForm(event) {
        // console.log("hallo");
        var formid = event.currentTarget.getAttribute("id");
        if (formid == "circleicon") {
            selectedform = "circle";
            console.log("rufe drawcircle auf");
        }
        else if (formid == "triangleicon") {
            selectedform = "triangle";
            console.log("rufe drawtriangle auf");
        }
        else if (formid == "squareicon") {
            selectedform = "square";
            console.log("rufe drawsquare auf");
        }
        else if (formid == "flashicon") {
            selectedform = "flash";
            console.log("rufe drawflash auf");
        }
        console.log(selectedform);
    }
    function setAnimation(event) {
        var animationid = event.currentTarget.getAttribute("id");
        if (animationid == "position") {
            selectedanimation = "position";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
        }
        console.log(selectedanimation);
    }
    function clearCanvas() {
        console.log("delete");
        // Array leeren
        var index = MagicCanvas.canvasElement[length];
        symbols.splice(index, 1);
        // // Store the current transformation matrix
        // crc2.save();
        // // Use the identity matrix while clearing the canvas
        // crc2.setTransform(1, 0, 0, 1, 0, 0);
        // crc2.clearRect(0, 0, canvaswidth, canvasheight);
        // // Restore the transform
        // crc2.restore();
    }
    function savePicture() {
        // let name: any;
        // (document.querySelector("#picturename") as HTMLInputElement).value = name;
        var name = document.getElementById("#picturename").value;
        var namevalue = document.getElementsByClassName("name")[0].nodeValue;
        console.log("name:" + namevalue);
    }
    function draganddrop(_event) {
        console.log("it is draganddropping");
        // Funktion nacher so aufrufen
        // symbols.onmousedown = function(event): void {
        //     // (1) prepare to moving: make absolute and on top by z-index
        //     symbols.style.position = "absolute";
        //     symbols.style.zIndex = 1000;
        //     // move it out of any current parents directly into body
        //     // to make it positioned relative to the body
        //     document.body.append(symbols);
        //     // centers the symbols at (pageX, pageY) coordinates
        //     function moveAt(pageX, pageY): void {
        //       symbols.style.left = pageX - symbols.offsetWidth / 2 + "px";
        //       symbols.style.top = pageY - symbols.offsetHeight / 2 + "px";
        //     }
        //     // move our absolutely positioned symbols under the pointer
        //     moveAt(event.pageX, event.pageY);
        //     function onMouseMove(event): void {
        //       moveAt(event.pageX, event.pageY);
        //     }
        //     // (2) move the symbols on mousemove
        //     document.addEventListener("mousemove", onMouseMove);
        //     // (3) drop the symbols, remove unneeded handlers
        //     symbols.onmouseup = function() {
        //       document.removeEventListener("mousemove", onMouseMove);
        //       symbols.onmouseup = null;
        //     };
        //   };
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