var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    MagicCanvas.canvas = document.querySelector("canvas");
    // Heroku App Verlinkung
    var appurl = "https://magiccanvas3.herokuapp.com/";
    // Speichern von ausgewählter Farbe, Form und Animation
    var selectedcolor = "#ff0000";
    var selectedform = "circle";
    var selectedanimation = "position";
    // Array mit allen Eigenschaften
    MagicCanvas.symbols = [];
    // Bewegungen auf dem Canvas
    var isMoving = false; // bewegt sich das Element
    var moveX = 0; // Bewegung in x Richtung
    var moveY = 0; // Bewegung in y Richtung
    var draggedElementIndex = 0; // welches Element wird angesprochen ???
    // Zeitvariable, zum Neuladen ab bestimmter Zeit
    var timeOut;
    // läuft die Animation
    var animationRunning = false;
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas;
            return __generator(this, function (_a) {
                canvas = document.querySelector("canvas");
                if (!canvas)
                    return [2 /*return*/];
                MagicCanvas.crc2 = canvas.getContext("2d");
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
                canvas.addEventListener("mousedown", function (event) { startMove(canvas, event); });
                canvas.addEventListener("mousemove", function (event) { nowMove(canvas, event); });
                canvas.addEventListener("mouseup", function (event) { stopMove(canvas, event); });
                return [2 /*return*/];
            });
        });
    }
    function savePicture(_event) {
        return __awaiter(this, void 0, void 0, function () {
            var nameSaved, datasymbols, response, responseText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameSaved = document.getElementById("picturename").value;
                        console.log("name:" + nameSaved);
                        datasymbols = JSON.stringify(MagicCanvas.symbols);
                        return [4 /*yield*/, fetch(appurl + "?" + "action=insert&name=" + nameSaved + "&data=" + datasymbols)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        responseText = _a.sent();
                        console.log(responseText);
                        alert("Picture saved!");
                        return [2 /*return*/];
                }
            });
        });
    }
    function rulesVisibility() {
        console.log("show rules");
        var rulesdiv = document.querySelector("#overlay");
        // Funktion wird mit klick aufgerufen, dann wird abgefragt, ob der div gerade sichtbar ist
        // wenn nein, dann einblenden, sonst ausgeblendet lassen
        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        }
        else {
            rulesdiv.style.display = "none";
        }
    }
    function handleCanvasSize() {
        // Canvas sizes als Radio Input Element
        var canvas = document.querySelector("canvas");
        var standardsize = document.querySelector("#standard");
        var smallsize = document.querySelector("#small");
        var mediumsize = document.querySelector("#medium");
        var largesize = document.querySelector("#large");
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
    function setBackground() {
        var white = document.querySelector("#white");
        var black = document.querySelector("#black");
        var beige = document.querySelector("#beige");
        if (white.checked == true) {
            MagicCanvas.crc2.fillStyle = "#FFFFFF";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
        if (black.checked == true) {
            MagicCanvas.crc2.fillStyle = "#000000";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
        if (beige.checked == true) {
            MagicCanvas.crc2.fillStyle = "#FFE3BD";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
    }
    function generateSymbols(_event) {
        console.log("generate Symbols");
        // ruft Constructor auf (durch new), Eigenschaften werden dem Element zugeordnet
        var element = new MagicCanvas.CanvasElement(selectedform, selectedcolor, selectedanimation);
        // element wird dem Array hinzugefügt
        MagicCanvas.symbols.push(element);
        // Elemnet wird gezeichnet
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
        var position = document.querySelector("#position");
        var rotate = document.querySelector("#rotate");
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
    function animateElementsStop() {
        // Stop Button stoppt die Animation
        animationRunning = false;
        animateElements(animationRunning);
        console.log("Stop");
    }
    function animateElementsStart() {
        // Start Button startet die Animation
        animationRunning = true;
        animateElements(animationRunning);
        console.log("Start");
    }
    function animateElements(state) {
        if (state === void 0) { state = false; }
        var canvas = document.querySelector("canvas");
        if (state == false) {
            // Verhindern das die Funktion erneut ausgeführt wird und Animation beenden
            clearTimeout(timeOut);
        }
        else {
            for (MagicCanvas.index = 0; MagicCanvas.index < MagicCanvas.symbols.length; MagicCanvas.index++) {
                // alle Symbols werden animiert innerhalb des Canvas
                MagicCanvas.symbols[MagicCanvas.index].animate(canvas.width, canvas.height);
            }
            // alle 25ms wird die Animation neugeladen, damit sie sich bewegen
            timeOut = setTimeout(function () {
                // soll keinen "Schweif" hinter sich herziehen, canvas muss immer wieder neu geziechnet werdeb
                clearForAnimation();
                animateElements(animationRunning);
            }, 25);
        }
    }
    function clearForAnimation() {
        var canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        // Background wird immer neu geladen
        setBackground();
    }
    function clearCanvas() {
        // Nutzer kann mit delete Buuton alle Elemente des Canvas löschen
        console.log("delete");
        var canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        MagicCanvas.symbols = [];
        // Background wird trotzdem gesaved
        setBackground();
    }
    function drawAll() {
        var index = 0;
        // Elemente des Canvas immer wieder löschen, damit neu gezeichnet werden kann
        clearForAnimation();
        // alle Elemente zeichnen
        for (index = 0; index < MagicCanvas.symbols.length; index++) {
            MagicCanvas.symbols[index].draw();
        }
    }
    function startMove(canvas, event) {
        // Maus Position 
        moveX = event.offsetX;
        moveY = event.offsetY;
        // neu skalieren für unterschiedliche Bildschirmgrößen
        moveX = Math.round(event.offsetX * (canvas.width / canvas.offsetWidth));
        moveY = Math.round(event.offsetY * (canvas.height / canvas.offsetHeight));
        console.log("moveX: " + moveX + " moveY: " + moveY);
        // Elemenet das verschoben werden soll ermitteln
        draggedElementIndex = getDraggedElement(moveX, moveY);
        // innerhalb von Canvas darf sich das Element bewegen
        if (draggedElementIndex !== -1) {
            isMoving = true;
        }
    }
    function nowMove(canvas, event) {
        if (isMoving === true) {
            // Aktuelle Position der Maus
            moveX = event.offsetX;
            moveY = event.offsetY;
            if (draggedElementIndex !== -1) {
                // Position der Elemente werden der Maus Position zugeschrieben --> kleben an der Maus
                MagicCanvas.symbols[draggedElementIndex].position.x = moveX;
                MagicCanvas.symbols[draggedElementIndex].position.y = moveY;
            }
            // alle Elemente müssen wieder neu gezeichnet werden
            drawAll();
        }
    }
    function stopMove(canvas, event) {
        if (isMoving === true) {
            console.log("moveX: " + moveX + " moveY: " + moveY);
            if (draggedElementIndex !== -1) {
                MagicCanvas.symbols[draggedElementIndex].position.x = moveX;
                MagicCanvas.symbols[draggedElementIndex].position.y = moveY;
                MagicCanvas.symbols[draggedElementIndex].draw();
            }
            moveX = 0;
            moveY = 0;
            // Bewegung zuende
            isMoving = false;
        }
    }
    function getDraggedElement(moveX, moveY) {
        if (moveX === void 0) { moveX = 0; }
        if (moveY === void 0) { moveY = 0; }
        var index = 0;
        // Index des Elementes, welches durch den Benuter verschoben werden soll
        var foundIndex = -1;
        for (index = 0; index < MagicCanvas.symbols.length; index++) {
            // Maus Position muss auf dem Element sein, um es zu bewegen
            if ((moveX <= MagicCanvas.symbols[index].position.x + MagicCanvas.symbols[index].size) && (moveX >= MagicCanvas.symbols[index].position.x)
                && (moveY <= MagicCanvas.symbols[index].position.y + MagicCanvas.symbols[index].size) && (moveY >= MagicCanvas.symbols[index].position.y)) {
                foundIndex = index;
                break;
            }
        }
        return foundIndex;
    }
    function fillList() {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(appurl + "?" + "action=select")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        responseText = _a.sent();
                        console.log(responseText);
                        return [2 /*return*/];
                }
            });
        });
    }
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Main.js.map