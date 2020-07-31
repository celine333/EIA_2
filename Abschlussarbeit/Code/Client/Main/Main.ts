namespace MagicCanvas {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

    // ausgwählte Farbe zum Füllen
    let selectedcolor: string = "#ff0000";
    let selectedform: string = "circle";
    let selectedanimation: string = "position";

    export let symbols: CanvasElement[] = [];

    let timeOut: any;

    let animationRunning: boolean = false;
    export let xpos: number;
    export let ypos: number;
    export let index: number;


    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        //Klick auf Hintergrundfarbe
        document.querySelector("#white").addEventListener("click", setBackground);
        document.querySelector("#black").addEventListener("click", setBackground);
        document.querySelector("#beige").addEventListener("click", setBackground);

        // Klick auf Farbe
        document.querySelector("#red").addEventListener("click", setColor);
        document.querySelector("#blue").addEventListener("click", setColor);
        document.querySelector("#green").addEventListener("click", setColor);
        document.querySelector("#yellow").addEventListener("click", setColor);

        // Klick auf Regel Button
        document.querySelector("#rules").addEventListener("click", rulesVisibility);

        // Generate
        document.querySelector("#generate").addEventListener("click", generateSymbols);

        // Animationen
        document.querySelector("#startanimation").addEventListener("click", animateElementsStart);
        document.querySelector("#stopanimation").addEventListener("click", animateElementsStop);

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
        // Canvas sizes
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
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

    function setBackground(): void {

        let white: HTMLInputElement = <HTMLInputElement>document.querySelector("#white");
        let black: HTMLInputElement = <HTMLInputElement>document.querySelector("#black");
        let beige: HTMLInputElement = <HTMLInputElement>document.querySelector("#beige");

        if (white.checked == true) {
            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas. height);
        }
        if (black.checked == true) {
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas. height);
        }
        if (beige.checked == true) {
            crc2.fillStyle = "#FFE3BD";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas. height);
        }
    }

    function generateSymbols(_event: Event): void {
        console.log("generate Symbols");

        let element: CanvasElement = new CanvasElement(selectedform, selectedcolor, selectedanimation);
        symbols.push(element);

        if (selectedanimation == "rotate") {
            crc2.restore();
            element.rotate();
        } 

        element.draw();
    }

    function setColor(event): void {
        // Element wird über das Event mit Hilfe der id geholt 
        let actualid: string = event.target.getAttribute("id");
        console.log("Event:" + event.target);

        // Farben divs
        let red: HTMLDivElement = <HTMLDivElement>document.querySelector("#red");
        let blue: HTMLDivElement = <HTMLDivElement>document.querySelector("#blue");
        let green: HTMLDivElement = <HTMLDivElement>document.querySelector("#green");
        let yellow: HTMLDivElement = <HTMLDivElement>document.querySelector("#yellow");

        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
            red.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
        } else if (actualid == "blue") {
            selectedcolor = "#000890";
            blue.style.border = "1px solid #ff0000";
            red.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
            // colorblue.style.border = "solid #FF0000";
        } else if (actualid == "green") {
            selectedcolor = "#0D6217";
            green.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            red.style.border = "none";
            yellow.style.border = "none";
        } else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
            yellow.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            red.style.border = "none";
        }

        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }

    function setForm(event): void {
        let formid: string = event.currentTarget.getAttribute("id");

        // Formen divs
        let circle: HTMLDivElement = <HTMLDivElement>document.querySelector("#circleicon");
        let triangle: HTMLDivElement = <HTMLDivElement>document.querySelector("#triangleicon");
        let square: HTMLDivElement = <HTMLDivElement>document.querySelector("#squareicon");
        let flash: HTMLDivElement = <HTMLDivElement>document.querySelector("#flashicon");

        if (formid == "circleicon") {
            selectedform = "circle";
            circle.style.border = "1px solid #ff0000";
            triangle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        } else if (formid == "triangleicon") {
            selectedform = "triangle";
            triangle.style.border = "1px solid #ff0000";
            circle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        } else if (formid == "squareicon") {
            selectedform = "square";
            square.style.border = "1px solid #ff0000";
            flash.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        } else if (formid == "flashicon") {
            selectedform = "flash";
            flash.style.border = "1px solid #ff0000";
            square.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }

        console.log(selectedform);
    }

    function setAnimation(event): void {
        let animationid: string = event.currentTarget.getAttribute("id");

        if (animationid == "position") {
            selectedanimation = "position";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
        }
    }

    function animateElementsStop(): void {
        animationRunning = false;
        animateElements(animationRunning);
        console.log("Stop");
    }

    function animateElementsStart(): void {
        animationRunning = true;
        animateElements(animationRunning);
        console.log("Start");
    }

    function animateElements(state: boolean = false): void {
        let element: CanvasElement = new CanvasElement(selectedform, selectedcolor, selectedanimation);

        if (state == false) {
            clearTimeout(timeOut);
        } else {
            for (index = 0; index < symbols.length; index++) {
                if (selectedanimation == "position") {
                    element.move();
                }
                if (selectedanimation == "rotate") {
                        element.rotate();
                }
            }

            // do something
            timeOut = setTimeout(function (): void {
                // Kommentar einfügen
                // clearCanvas();
                animateElements(animationRunning);
            }, 25);
        }
    }

    function clearCanvas(): void {
        console.log("delete");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        symbols = [];
    }

    function savePicture(): void {
        let name: string = (<HTMLInputElement>document.getElementById("picturename")).value;
        console.log("name:" + name);
    }


    function draganddrop(_event: MouseEvent): void {
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

        // let isDragging: boolean = false;

        // function handleMousedown(_event: MouseEvent): void {
        //     // wo ist MausPosition (x,y)
        //     isDragging = true;
        // }

        // function handleMouseUp(_event: MouseEvent): void {
        //     // wo ist MausPosition (x,y)
        //     isDragging = false;
        // }

        // function handleMouseOut(e) {
        //     // wo ist MausPosition (x,y)
        //     // Nutzer ist außerhalb von Canvas
        //     isDragging = false;
        // }

        // function handleMouseMove(e) {
        //     // wo ist MausPosition (x,y)
        //     // if the drag flag is set, clear the canvas and draw the image
        //     if (isDragging == true) {
        //         //
        //     }
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
