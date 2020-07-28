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
        document.querySelector("#paletteid").addEventListener("click", setColor);
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
        document.querySelector("#save").addEventListener("click", savePicture);
        document.querySelector("#picturename").addEventListener("oninput", enterName);
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
        // neues Element kreieren
        var element = new MagicCanvas.canvasElement();
        // crc2.selectedform.fill(selectedcolor);
        // if (selectedform)
        //         crc2.fillStyle = selectedcolor;
        // crc2.fill();
        // let position: Vector = new Vector(x, y);
        var circle = new MagicCanvas.Circle(position);
        circle.draw();
        symbols.push(circle);
        // element.drawTriangle();
        // element.drawRectangle();
        // element.drawFlash();    
    }
    function setColor(event) {
        // Element wird über das Event mit Hilfe der id geholt 
        var actualid = event.target.getAttribute("id");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
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
        // // Store the current transformation matrix
        // crc2.save();
        // // Use the identity matrix while clearing the canvas
        // crc2.setTransform(1, 0, 0, 1, 0, 0);
        // crc2.clearRect(0, 0, canvaswidth, canvasheight);
        // // Restore the transform
        // crc2.restore();
    }
    function enterName() {
        // let name: any = (<HTMLInputElement>document.getElementById("#picturename")).value;
        // chosenName = name;
        // console.log("name:" + chosenName);
        var name = document.getElementById("#picturename").value;
        document.getElementById("pictures").innerHTML = "You wrote: " + name;
    }
    function savePicture(event) {
        // let name: any;
        // (document.querySelector("#picturename") as HTMLInputElement).value = name;
        // let name: any = (<HTMLInputElement>document.getElementById("#picturename")).value;
        // let namepicture: string = event.currentTarget.value;
        console.log("name:" + chosenName);
    }
    function draganddrop(_event) {
        console.log("it is draganddropping");
        //Funktion nacher so aufrufen
        symbol.onmousedown = function (event) {
            // (1) prepare to moving: make absolute and on top by z-index
            symbol.style.position = "absolute";
            symbol.style.zIndex = 1000;
            // move it out of any current parents directly into body
            // to make it positioned relative to the body
            document.body.append(symbol);
            // centers the symbol at (pageX, pageY) coordinates
            function moveAt(pageX, pageY) {
                symbol.style.left = pageX - symbol.offsetWidth / 2 + "px";
                symbol.style.top = pageY - symbol.offsetHeight / 2 + "px";
            }
            // move our absolutely positioned symbol under the pointer
            moveAt(event.pageX, event.pageY);
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            // (2) move the symbol on mousemove
            document.addEventListener("mousemove", onMouseMove);
            // (3) drop the symbol, remove unneeded handlers
            symbol.onmouseup = function () {
                document.removeEventListener("mousemove", onMouseMove);
                symbol.onmouseup = null;
            };
        };
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