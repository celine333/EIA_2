"use strict";
var L08_Virus;
(function (L08_Virus) {
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawBackground();
        drawBloodvessel({ x: 562.5, y: 200 });
        drawPattern();
        drawVirus();
        drawAntibody();
        drawKillercells();
        drawBloodcells();
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "black");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawBloodvessel(_position) {
        console.log("Bloodvessel");
    }
    function drawPattern() {
        console.log("Pattern");
    }
    function drawVirus() {
        console.log("Virus");
    }
    function drawAntibody() {
        console.log("Antibody");
    }
    function drawKillercells() {
        console.log("Killercells");
    }
    function drawBloodcells() {
        console.log("Bloodcells");
    }
})(L08_Virus || (L08_Virus = {}));
//# sourceMappingURL=Virus_script.js.map