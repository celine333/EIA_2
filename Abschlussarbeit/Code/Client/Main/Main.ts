namespace MagicCanvas {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

    // Heroku App Verlinkung
    let appurl: string = "https://magiccanvas3.herokuapp.com/";

    // Interface für Daten Übertragung
    interface DataStructure {
        name: string;
        data: string;
    }

    // Speichern von ausgewählter Farbe, Form und Animation
    let selectedcolor: string = "#ff0000";
    let selectedform: string = "circle";
    let selectedanimation: string = "position";

    // Array mit allen Eigenschaften
    export let symbols: CanvasElement[] = [];

    // Bewegungen auf dem Canvas
    let isMoving: boolean = false; // bewegt sich das Element
    let moveX: number = 0; // Bewegung in x Richtung
    let moveY: number = 0; // Bewegung in y Richtung
    let draggedElementIndex: number = 0; // welches Element wird angesprochen ???
    
    // Zeitvariable, zum Neuladen ab bestimmter Zeit
    let timeOut: any;

    // läuft die Animation
    let animationRunning: boolean = false;
    export let xpos: number;
    export let ypos: number;
    export let index: number;


    async function handleLoad(_event: Event): Promise<void> {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // Lade alle gespeicherten Bilder
        fillList();
        
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
        canvas.addEventListener("mousedown", function(event) {startMove(canvas, event); });
        canvas.addEventListener("mousemove", function(event) {nowMove(canvas, event); });
        canvas.addEventListener("mouseup", function(event) {stopMove(canvas, event); });
    }

    async function savePicture(_event: Event): Promise<void> {
        // eingetragener Name des Nutzers
        let nameSaved: string = (<HTMLInputElement>document.getElementById("picturename")).value;
        console.log("name:" + nameSaved);

        //konvertiert Wert in Json string
        // Wert = Daten aus dem Array Symbols
        let datasymbols: string = JSON.stringify(symbols);
        
        // let query: URLSearchParams = new URLSearchParams(<any>data);
        //let query: DataStructure = {name: nameSaved, data: datasymbols};

        // Vorlage für die Antwort, erst Url von der App, dann ausgesuchter name und die Daten des Bildes dazu
        let response: Response = await fetch(appurl + "?" + "action=insert&name=" + nameSaved + "&data=" + datasymbols);
        // stellt die Antwort als Javascript string dar
        let responseText: string = await response.text();
        console.log(responseText);
        alert("Picture saved!");
    }

    function rulesVisibility(): void {
        console.log("show rules");
        let rulesdiv: HTMLElement = <HTMLElement>document.querySelector("#overlay");

        // Funktion wird mit klick aufgerufen, dann wird abgefragt, ob der div gerade sichtbar ist
        // wenn nein, dann einblenden, sonst ausgeblendet lassen
        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        } else {
            rulesdiv.style.display = "none";
        }
    }

    function handleCanvasSize(): void {
        // Canvas sizes als Radio Input Element
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
        
        // überprüft welcher Radiobutton "checked" ist und passt dann die Größe an
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
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        }
        if (black.checked == true) {
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        }
        if (beige.checked == true) {
            crc2.fillStyle = "#FFE3BD";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        }
    }

    function generateSymbols(_event: Event): void {
        console.log("generate Symbols");

        // ruft Constructor auf (durch new), Eigenschaften werden dem Element zugeordnet
        let element: CanvasElement = new CanvasElement(selectedform, selectedcolor, selectedanimation);
        // element wird dem Array hinzugefügt
        symbols.push(element);
        // Elemnet wird gezeichnet
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

        let position: HTMLDivElement = <HTMLDivElement>document.querySelector("#position");
        let rotate: HTMLDivElement = <HTMLDivElement>document.querySelector("#rotate");

        position.style.border = "0px solid #ff0000";
        rotate.style.border = "0px solid #ff0000";

        if (animationid == "position") {
            selectedanimation = "position";
            position.style.border = "1px solid #ff0000";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
            rotate.style.border = "1px solid #ff0000";
        }
    }

    function animateElementsStop(): void {
        // Stop Button stoppt die Animation
        animationRunning = false;
        animateElements(animationRunning);
        console.log("Stop");
    }

    function animateElementsStart(): void {
        // Start Button startet die Animation
        animationRunning = true;
        animateElements(animationRunning);
        console.log("Start");
    }

    function animateElements(state: boolean = false): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");

        if (state == false) {
            // Verhindern das die Funktion erneut ausgeführt wird und Animation beenden
            clearTimeout(timeOut);
        } else {
            for (index = 0; index < symbols.length; index++) {
                // alle Symbols werden animiert innerhalb des Canvas
                symbols[index].animate(canvas.width, canvas.height);
            }

            // alle 25ms wird die Animation neugeladen, damit sie sich bewegen
            timeOut = setTimeout(function (): void {
                // soll keinen "Schweif" hinter sich herziehen, canvas muss immer wieder neu geziechnet werdeb
                clearForAnimation();
                animateElements(animationRunning);
            }, 25);
        }
    }

    function clearForAnimation(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        // Background wird immer neu geladen
        setBackground();
    }

    function clearCanvas(): void {
        // Nutzer kann mit delete Buuton alle Elemente des Canvas löschen
        console.log("delete");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        symbols = [];
        // Background wird trotzdem gesaved
        setBackground();
    }

    function drawAll(): void {
        let index: number = 0;
        
        // Elemente des Canvas immer wieder löschen, damit neu gezeichnet werden kann
        clearForAnimation();
        // alle Elemente zeichnen
        for (index = 0; index < symbols.length; index++) {
            symbols[index].draw();
        }

    }    

    function startMove(canvas: any, event: any): void {
        // Maus Position 
        moveX = event.offsetX;
        moveY = event.offsetY;

        // neu skalieren für unterschiedliche Bildschirmgrößen
        moveX = Math.round( event.offsetX * (canvas.width / canvas.offsetWidth) );
        moveY = Math.round( event.offsetY * (canvas.height / canvas.offsetHeight) );

        console.log("moveX: " + moveX + " moveY: " + moveY);

        // Elemenet das verschoben werden soll ermitteln
        draggedElementIndex = getDraggedElement(moveX, moveY);
        // innerhalb von Canvas darf sich das Element bewegen
        if (draggedElementIndex !== -1) {
            isMoving = true;
        }
    }

    function nowMove (canvas: any, event: any): void {
        if (isMoving === true) {
            // Aktuelle Position der Maus
            moveX = event.offsetX;
            moveY = event.offsetY;
            if (draggedElementIndex !== -1) {
                // Position der Elemente werden der Maus Position zugeschrieben --> kleben an der Maus
                symbols[draggedElementIndex].position.x = moveX;
                symbols[draggedElementIndex].position.y = moveY;
            }

            // alle Elemente müssen wieder neu gezeichnet werden
            drawAll();            
        }
    }

    function stopMove(canvas: any, event: any): void {
        if (isMoving === true) {

            console.log("moveX: " + moveX + " moveY: " + moveY);            
            if (draggedElementIndex !== -1) {
                symbols[draggedElementIndex].position.x = moveX;
                symbols[draggedElementIndex].position.y = moveY;
                symbols[draggedElementIndex].draw();
            }
            moveX = 0;
            moveY = 0;
            // Bewegung zuende
            isMoving = false;
        }
    }


    function getDraggedElement(moveX: number = 0, moveY: number = 0) {
        let index: number = 0;
       // Index des Elementes, welches durch den Benuter verschoben werden soll
        let foundIndex: number = -1;

        for (index = 0; index < symbols.length; index++) {
            // Maus Position muss auf dem Element sein, um es zu bewegen
            if ((moveX <= symbols[index].position.x + symbols[index].size) && (moveX >= symbols[index].position.x)
            && (moveY <= symbols[index].position.y + symbols[index].size) && (moveY >= symbols[index].position.y)) {
                foundIndex = index;
                break;

            }
        }

        return foundIndex;
    }

    async function fillList(): Promise<void> {
        // key = action, value = select
        let response: Response = await fetch(appurl + "?" + "action=select");
        let responseText: string = await response.text();
        console.log(responseText);
    }

}

