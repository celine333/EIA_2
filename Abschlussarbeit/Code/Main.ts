namespace MagicCanvas { 

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    // ausgwählte Farbe zum Füllen
    let selectedcolor: string = "#ff0000";
    let canvasheight: number;
    let canvaswidth: number;

    // Canvas sizes
    let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
    let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
    let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
    let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
    let canvas = document.querySelector("canvas");

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

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

        // Klick auf die verschiedenen Form Icons
        document.querySelector("#circleicon").addEventListener("click", setForm);
        document.querySelector("#triangleicon").addEventListener("click", setForm);
        document.querySelector("#squareicon").addEventListener("click", setForm);
        document.querySelector("#flashicon").addEventListener("click", setForm);

    }
    
    function rulesVisibility(): void {
        console.log("show rules");
        let rulesdiv: HTMLElement = <HTMLElement>document.querySelector("#overlay");

        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        } else {
            rulesdiv.style.display = "none";
        }
    }

    function handleCanvasSize(): void {
        if (standardsize.checked == true) {
            canvas.setAttribute("style", "width: 500px");
            canvas.setAttribute("style", "height: 300px");
            console.log("standard");
            canvaswidth = 500;
            canvasheight = 300;
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
    
    function generateSymbols (_event: Event): void {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde
        
        // neues Element kreieren
        // let element: canvasElement = new canvasElement();
        
        // Kreis ------------------------------
        let r: number = 4;
        crc2.save();
        crc2.translate(40, 40);
        // Skalierung vertikal und horizontal
        crc2.scale(5, 5);
        // crc2.translate(-50, -50);
        crc2.beginPath();
        crc2.arc(0, 0, r, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.restore();
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();


        // Dreieck
        crc2.beginPath();
        crc2.moveTo(70, 70);
        crc2.lineTo(10, 70);
        crc2.lineTo(10, 25);
        crc2.closePath();
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();


        //Rectangle
        crc2.beginPath();
        crc2.rect(10, 10, 55, 40);
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();


        // Flash
        crc2.beginPath();
        crc2.translate(40, 40);
        crc2.moveTo(0, 0);
        crc2.lineTo(20, 0);
        crc2.lineTo(15, 25);
        crc2.lineTo(25, 25);
        crc2.lineTo(10, 50);
        crc2.moveTo(0, 0);
        crc2.lineTo(0, 30);
        crc2.lineTo(12, 30);
        crc2.lineTo(10, 50);
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();
    }

    function setColor(event): void {
        // Element wird über das Event mit Hilfe der id geholt 
        let actualid: string = event.target.getAttribute("id");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
        } else if (actualid == "blue") {
            selectedcolor = "#000890";
        } else if (actualid == "green") {
            selectedcolor = "#0D6217";
        } else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
        }
       
        console.log("Event:" + event.target.getAttribute("id"));
    }

    function setForm(): void {
        console.log("hallo");
    }

    function clearCanvas(): void  {
        console.log("delete");
        // Store the current transformation matrix
        crc2.save();

        // Use the identity matrix while clearing the canvas
        crc2.setTransform(1, 0, 0, 1, 0, 0);
        crc2.clearRect(0, 0, canvaswidth, canvasheight);

        // Restore the transform
        crc2.restore();
        
    }
}

// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
// Optional: alle Elemente hören sich auf zu bewegen während das neue ELement verschoben wird
