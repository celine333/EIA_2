"use strict";
var L10_Virus;
(function (L10_Virus) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    // let viruses: Virus[] = [];
    // let antibodys: Antibody[] = [];
    // let killercells: Killercell[] = [];
    // let bloodcells: Bloodcell[] = [];
    let background;
    function handleLoad(_event) {
        console.log("Particles moving");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Virus.crc2 = canvas.getContext("2d");
        drawBackground();
        createVirus(15);
        createAntibody(4);
        createKillercell(4);
        createBloodcell(9);
        // testPosition(_event);
        //zeit für neuladen
        window.setInterval(update, 20);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L10_Virus.crc2.createLinearGradient(0, 0, 0, L10_Virus.crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");
        L10_Virus.crc2.fillStyle = gradient;
        L10_Virus.crc2.fillRect(0, 0, L10_Virus.crc2.canvas.width, L10_Virus.crc2.canvas.height);
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
        L10_Virus.crc2.fillStyle = L10_Virus.crc2.createPattern(pattern.canvas, "repeat");
        L10_Virus.crc2.fillRect(0, 0, 750, 400);
        pattern.closePath();
        pattern.restore();
        background = L10_Virus.crc2.getImageData(0, 0, 750, 400);
    }
    function createVirus(_nVirus) {
        console.log("create Virus");
        for (let i = 0; i < _nVirus; i++) {
            let virus = new L10_Virus.Virus(1.0);
            moveables.push(virus);
        }
    }
    function createAntibody(_nAntibody) {
        console.log("create Antibody");
        for (let i = 0; i < _nAntibody; i++) {
            let antibody = new L10_Virus.Antibody(1.0);
            moveables.push(antibody);
        }
    }
    function createKillercell(_nKillercells) {
        console.log("create Killercell");
        for (let i = 0; i < _nKillercells; i++) {
            let killercell = new L10_Virus.Killercell(1.0);
            moveables.push(killercell);
        }
    }
    function createBloodcell(_nBloodcell) {
        console.log("create Bloodcell");
        for (let i = 0; i < _nBloodcell; i++) {
            let bloodcell = new L10_Virus.Bloodcell(1.0);
            moveables.push(bloodcell);
        }
    }
    function update() {
        console.log("Update");
        L10_Virus.crc2.fillRect(0, 0, L10_Virus.crc2.canvas.width, L10_Virus.crc2.canvas.width);
        L10_Virus.crc2.putImageData(background, 0, 0);
        // Update Viruses
        for (let virus of moveables) {
            virus.move(1 / 50);
            virus.draw();
        }
        // Update Antibodys
        for (let antibody of moveables) {
            antibody.move(1 / 50);
            antibody.draw();
        }
        // Update Killercells
        for (let killercell of moveables) {
            killercell.move(1 / 50);
            killercell.draw();
        }
        // Update Bloodecells
        for (let bloodcell of moveables) {
            bloodcell.move(1 / 50);
            bloodcell.draw();
        }
    }
    // function testPosition(_event: Event): void {
    //     for (let virus of moveables) {
    //         let humancellHit: Killercell | null = getKillercellHit(virus.position);
    //         // wenn der Virus auf die Killerzelle trifft, dann werden mehrere Funktionen aufgerufen
    //         if (humancellHit)  {
    //            getKillercellHit(virus.position);
    //         }
    //     }
    // }
    // function startInfection(): void {
    //     window.setTimeout(function (): void {
    //         console.log("setTiemout");
    //     },                5000);
    // }
    // function getKillercellHit(_virusposition: Vector): Killercell | null {
    //     for (let killercell of killercells) {
    //         if (killercell.isHit(_virusposition)) {
    //             startInfection();
    //             return killercell;
    //         }
    //     }
    //     return null;
    // }
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Main.js.map