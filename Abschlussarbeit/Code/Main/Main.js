var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    var canvas = document.querySelector("canvas");
    // ausgwählte Farbe zum Füllen
    var selectedcolor = "#ff0000";
    var selectedform = "circle";
    var selectedanimation = "position";
    var symbols = [];
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
        // Element verschieben
        canvas.addEventListener("mousedown", draganddrop);
        // zeit für neuladen
        // window.setInterval(updateAnimation, 20);
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
        var canvas = document.querySelector("canvas");
        var standardsize = document.querySelector("#standard");
        var smallsize = document.querySelector("#small");
        var mediumsize = document.querySelector("#medium");
        var largesize = document.querySelector("#large");
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
        var element = new MagicCanvas.CanvasElement(selectedform, selectedcolor, selectedanimation);
        symbols.push(element);
        if (selectedanimation == "rotate") {
            MagicCanvas.crc2.restore();
            element.rotate();
        }
        element.draw();
    }
    function setColor(event) {
        // Element wird über das Event mit Hilfe der id geholt 
        var actualid = event.target.getAttribute("id");
        console.log("Event:" + event.target);
        // Farben divs
        var red = document.querySelector("#red");
        var blue = document.querySelector("#blue");
        var green = document.querySelector("#green");
        var yellow = document.querySelector("#yellow");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
            red.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "blue") {
            selectedcolor = "#000890";
            blue.style.border = "1px solid #ff0000";
            red.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
            // colorblue.style.border = "solid #FF0000";
        }
        else if (actualid == "green") {
            selectedcolor = "#0D6217";
            green.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            red.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
            yellow.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            red.style.border = "none";
        }
        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }
    function setForm(event) {
        var formid = event.currentTarget.getAttribute("id");
        // Formen divs
        var circle = document.querySelector("#circleicon");
        var triangle = document.querySelector("#triangleicon");
        var square = document.querySelector("#squareicon");
        var flash = document.querySelector("#flashicon");
        if (formid == "circleicon") {
            selectedform = "circle";
            circle.style.border = "1px solid #ff0000";
            triangle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        }
        else if (formid == "triangleicon") {
            selectedform = "triangle";
            triangle.style.border = "1px solid #ff0000";
            circle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        }
        else if (formid == "squareicon") {
            selectedform = "square";
            square.style.border = "1px solid #ff0000";
            flash.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }
        else if (formid == "flashicon") {
            selectedform = "flash";
            flash.style.border = "1px solid #ff0000";
            square.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }
        console.log(selectedform);
    }
    function setAnimation(event) {
        var animationid = event.currentTarget.getAttribute("id");
        // let positiondiv: HTMLDivElement = <HTMLDivElement>document.querySelector("#position");
        // let rotatediv: HTMLDivElement = <HTMLDivElement>document.querySelector("#rotate");
        if (animationid == "position") {
            selectedanimation = "position";
            // positiondiv.style.border = "1px solid #ff0000";
            // rotatediv.style.border = "none";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
            // rotatediv.style.border = "1px solid #ff0000";
            // positiondiv.style.border = "none";
        }
        console.log(selectedanimation);
    }
    function updateAnimation() {
        console.log("bewege dich");
        var element = new MagicCanvas.CanvasElement(selectedform, selectedcolor, selectedanimation);
        if (selectedanimation == "position") {
            for (var i = 0; i < symbols.length; i++) {
                element.move(1 / 50);
            }
        }
    }
    // function animateElementsStart(): void {
    //     let index: number;
    //     let xpos: number;        
    //     let ypos: number;   
    //     let animationRunning: boolean = true;
    //     for (; animationRunning;) {
    //         if (symbols.length > 0) {
    //             for (index = 0; index < symbols.length; index++) {
    //                 xpos = symbols[index].position.x;
    //                 ypos = symbols[index].position.y;                
    //                 // Hier jetzt x und y verändern. Hier hast du ja bestimmt ein Beispiel ?!?
    //                 xpos = xpos + 1;
    //                 ypos = ypos + 1;                
    //                 symbols[index].position.x = xpos;
    //                 symbols[index].position.y = ypos;    
    //                 symbols[index].draw();
    //             }
    //         }
    //         else {
    //             console.log("else");
    //         }
    //         // Eventuell kurz warten
    //     }
    // }
    function clearCanvas() {
        console.log("delete");
        var canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        symbols = [];
    }
    function savePicture() {
        var name = document.getElementById("picturename").value;
        console.log("name:" + name);
    }
    function draganddrop(_event) {
        console.log("it is draganddropping");
        // Code aus dem Internet, funktioniert für normale html elemente?
        // muss noch umgeändert und angepasst werden
        // element.onmousedown = function(event): void {
        //     // (1) prepare to moving: make absolute and on top by z-index
        //     element.style.position = "absolute";
        //     element.style.zIndex = 1000;
        //     // move it out of any current parents directly into body
        //     // to make it positioned relative to the body
        //     document.body.append(element);
        //     // centers the element at (pageX, pageY) coordinates
        //     function moveAt(pageX, pageY): void {
        //       element.style.left = pageX - element.offsetWidth / 2 + "px";
        //       element.style.top = pageY - element.offsetHeight / 2 + "px";
        //     }
        //     // move our absolutely positioned element under the pointer
        //     moveAt(event.pageX, event.pageY);
        //     function onMouseMove(event): void {
        //       moveAt(event.pageX, event.pageY);
        //     }
        //     // (2) move the element on mousemove
        //     document.addEventListener("mousemove", onMouseMove);
        //     // (3) drop the element, remove unneeded handlers
        //     element.onmouseup = function() {
        //       document.removeEventListener("mousemove", onMouseMove);
        //       symbols.onmouseup = null;
        //     };
        //   };
        // Element muss draggable sein
        // draggable: true;
        // add cursor styling
        // element.on("mouseover", function (): void {
        //     document.body.style.cursor = "pointer";
        // });
        // element.on("mouseout", function (): void {
        //     document.body.style.cursor = "default";
        // });
        var isDragging = false;
        function handleMousedown(_event) {
            // wo ist MausPosition (x,y)
            isDragging = true;
        }
        function handleMouseUp(_event) {
            // wo ist MausPosition (x,y)
            isDragging = false;
        }
        function handleMouseOut(e) {
            // wo ist MausPosition (x,y)
            // Nutzer ist außerhalb von Canvas
            isDragging = false;
        }
        function handleMouseMove(e) {
            // wo ist MausPosition (x,y)
            // if the drag flag is set, clear the canvas and draw the image
            if (isDragging == true) {
                //
            }
        }
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