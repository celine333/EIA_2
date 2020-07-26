namespace MagicCanvas { 

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    // let moveables: Moveable[] = [];

    // interface canvasElement {
    //     positionx: number;
    //     positiony: number;
    //     color: string;
    //     form: string;
    //     rotateangle: number;
    //     // rotate or move
    //     animationtype: string;
    //     // ELement ist aktiv wenn es nicht mehr in der Mitte ist
    //     active: boolean;
    // }

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        document.querySelector("#rules").addEventListener("click", rulesVisibility);
        document.querySelector("#standard").addEventListener("click", handleCanvasSize);
        document.querySelector("#small").addEventListener("click", handleCanvasSize);
        document.querySelector("#medium").addEventListener("click", handleCanvasSize);
        document.querySelector("#large").addEventListener("click", handleCanvasSize);
        document.querySelector("#generate").addEventListener("click", generateSymbols);
        generateSymbols(_event);
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
        console.log("hallo");
        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
        let canvas = document.querySelector("canvas");

        if (standardsize.checked == true) {
            canvas.setAttribute("style", "width: 500px");
            canvas.setAttribute("style", "height: 300px");
            console.log("standard");
        }
        if (smallsize.checked == true) {
            console.log("small");
            canvas.setAttribute("style", "width: 250px");
            canvas.setAttribute("style", "width: 150px");
           
        }
        if (mediumsize.checked == true) {
            canvas.setAttribute("style", "width: 400px");
        }
        if (largesize.checked == true) {
            canvas.setAttribute("style", "width: 500px");
        }
    }
    
    function generateSymbols (_event: Event): void {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde
        
        // // neues Element kreieren
        // let element: canvasElement = new canvasElement();
        
        // circle.draw();
        let r: number = 20;
        crc2.save();
        crc2.translate(10, 10);
        // Skalierung vertikal und horizontal
        crc2.scale(10, 10);
        // crc2.translate(-50, -50);
        crc2.beginPath();
        crc2.arc(0, 0, r, 0, 2 * Math.PI);
        crc2.closePath();

        crc2.restore();

        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();
       
        // // für die Moveables nacher
        // moveables.push(circle);
        //  // Update 
        // for (let moveable of moveables) {
        //     moveable.move(1 / 50);
        //     moveable.draw();
        // }

    }
    
}

// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
// Optional: alle Elemente hören sich auf zu bewegen während das neue ELement verschoben wird
