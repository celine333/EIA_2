"use strict";
var L11_Virus;
(function (L11_Virus) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    let background;
    function handleLoad(_event) {
        console.log("Particles moving");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L11_Virus.crc2 = canvas.getContext("2d");
        drawBackground();
        createVirus(12);
        createAntibody(4);
        createKillercell(4);
        createBloodcell(9);
        // testPosition(_event);
        // canvas.addEventListener("click", destroyVirus);
        handleContact();
        //zeit für neuladen
        window.setInterval(update, 20);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L11_Virus.crc2.createLinearGradient(0, 0, 0, L11_Virus.crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");
        L11_Virus.crc2.fillStyle = gradient;
        L11_Virus.crc2.fillRect(0, 0, L11_Virus.crc2.canvas.width, L11_Virus.crc2.canvas.height);
        console.log("Bloodvessel");
        // Muster
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.beginPath();
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        pattern.strokeStyle = "#FB0C01";
        pattern.stroke();
        L11_Virus.crc2.fillStyle = L11_Virus.crc2.createPattern(pattern.canvas, "repeat");
        L11_Virus.crc2.fillRect(0, 0, 750, 400);
        pattern.closePath();
        pattern.restore();
        background = L11_Virus.crc2.getImageData(0, 0, 750, 400);
    }
    function createVirus(_nVirus) {
        console.log("create Virus");
        for (let i = 0; i < _nVirus; i++) {
            let virus = new L11_Virus.Virus(1.0);
            moveables.push(virus);
        }
    }
    // function destroyVirus(_event: MouseEvent): void {
    //     // let virus: Virus = new Virus(1.0);
    //     console.log("destroy virus with antibody");
    //     // if (virus.clicked == true) {
    //     //     // dann bewegt sich der Antibody zum Virus und zerstört ihn
    //     // }
    //     // for (let moveable of moveables) {
    //     //     if (moveable instanceof Antibody) {
    //     //         let antibodyposition: Vector = moveable.position;
    //     //     }
    //     // }
    // }
    function createAntibody(_nAntibody) {
        console.log("create Antibody");
        for (let i = 0; i < _nAntibody; i++) {
            let antibody = new L11_Virus.Antibody(1.0);
            moveables.push(antibody);
        }
    }
    function createKillercell(_nKillercells) {
        console.log("create Killercell");
        for (let i = 0; i < _nKillercells; i++) {
            let killercell = new L11_Virus.Killercell(1.0);
            moveables.push(killercell);
        }
    }
    function createBloodcell(_nBloodcell) {
        console.log("create Bloodcell");
        for (let i = 0; i < _nBloodcell; i++) {
            let bloodcell = new L11_Virus.Bloodcell(1.0);
            moveables.push(bloodcell);
        }
    }
    function update() {
        console.log("Update");
        L11_Virus.crc2.fillRect(0, 0, L11_Virus.crc2.canvas.width, L11_Virus.crc2.canvas.width);
        L11_Virus.crc2.putImageData(background, 0, 0);
        // Update 
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        // Funktionsaufruf für eine neue Funktion: Prüfen ob 2 moveables nah sind
    }
    // function testPosition(): void {
    //     // Bereich in dem der Virus auf die Killerzelle trifft 
    //     for (let moveable of moveables) {
    //         if (moveable instanceof Virus) {
    //             let radiusvirus: number = moveable.radius;
    //             let virusposition: Vector = moveable.position;
    //             let cellHit: Killercell | null = getcellHit(virusposition, radiusvirus);
    //             if (cellHit) {
    //                 cellHit.infected = true;
    //             }
    //         }
    //     }
    // }
    // function getcellHit(_virusposition: Vector, _radiusvirus: number): Killercell | null {
    //     for (let moveable of moveables) {
    //         if (moveable instanceof Killercell && moveable.isHit(_virusposition, _radiusvirus)) {
    //             return moveable;
    //         }
    //     }
    //     return null;
    // }
    function handleContact() {
        let outerIndex = 0;
        let innerIndex = 0;
        let xContact = false;
        let yContact = false;
        for (outerIndex = 0; outerIndex < moveables.length; outerIndex++) {
            innerIndex = 0;
            xContact = false;
            yContact = false;
            for (innerIndex = 0; innerIndex < moveables.length; innerIndex++) {
                moveables[outerIndex].contact = false;
                // Nicht sich selbst vergleichen
                if (innerIndex != outerIndex) {
                    // X Koordinaten prüfen 
                    if (moveables[outerIndex].position.x < moveables[innerIndex].position.x) {
                        if (moveables[outerIndex].position.x + moveables[outerIndex].radius >= moveables[innerIndex].position.x) {
                            xContact = true;
                        }
                    }
                    else {
                        if (moveables[outerIndex].position.x <= moveables[innerIndex].position.x + moveables[outerIndex].radius) {
                            xContact = true;
                        }
                    }
                    // Y Koordinaten prüfen 
                    if (moveables[outerIndex].position.y < moveables[innerIndex].position.y) {
                        if (moveables[outerIndex].position.y + moveables[outerIndex].radius >= moveables[innerIndex].position.y) {
                            yContact = true;
                        }
                    }
                    else {
                        if (moveables[outerIndex].position.y <= moveables[innerIndex].position.y + moveables[outerIndex].radius) {
                            yContact = true;
                        }
                    }
                    if (yContact == true && xContact == true) {
                        moveables[outerIndex].contact = true;
                        break;
                    }
                }
            }
        }
    }
    // Funktion mit 2 For Schleifen mit moveables 
    // in der 2ten Forschleife if else mit wenn index der gleiche wie in der ersten dann nicht
    // innerhalb for schleife mit Abstand überprüfen
    // dann draw mit einer anderen Farbe
    // formoveables index aussen
    //  moveabe.contact = false
    //  for movables inner schleife index innen
    //      if indexaussen != indexinnen prüfen pos
    // Abstand : (position.x + 2* radius) && (position.y + 2* radius) dann collision 
    //      ist contact da dann Contact für moveable aussen = true, break for 
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Main.js.map