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
        drawPattern();
        drawVirus({ x: 350, y: 50 }, { x: 15, y: 15 });
        drawAntibody({ x: 30, y: 30 }, { x: 10, y: 10 });
        drawKillercells();
        drawBloodcells({ x: 50, y: 50 }, { x: 10, y: 5 });
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "pink");
        gradient.addColorStop(1, "red");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawPattern() {
        console.log("Pattern");
        //Muster
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = "hsla(0, 100%, 60%, 0.22)";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        // Linienfarbe
        pattern.strokeStyle = "#8B0000";
        pattern.stroke();
        crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, 750, 400);
    }
    function drawVirus(_position, _size) {
        console.log("Virus");
        let nViruses = 6;
        let nProtein = 6;
        let r1 = 12.5;
        let r2 = 3;
        for (let i = 0; i < nViruses; i++) {
            // let virus: Path2D = new Path2D();
            let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
            gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
            // Kreis
            crc2.save();
            crc2.translate((Math.random() * _position.x), (Math.random() * _position.y));
            crc2.fillStyle = gradient;
            crc2.beginPath();
            crc2.arc(0, 0, r1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
            // for (let i: number = 0; i < nProtein; i++) {
            // }
        }
    }
    function drawAntibody(_position, _size) {
        console.log("Antibody");
        let nAntibodys = 4;
        for (let i = 0; i < nAntibodys; i++) {
            crc2.save();
            let cell = new Path2D();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            // Antibody
            crc2.beginPath();
            crc2.moveTo(_position.x, _position.y);
            crc2.lineWidth = 50;
            crc2.lineTo(10, -8);
            // crc2.lineTo(1, 0);
            // crc2.lineTo(1, -1);
            crc2.moveTo(_position.x, _position.y);
            crc2.lineTo(-10, 8);
            // crc2.lineTo(1, 0);
            // crc2.lineTo(1, -1);
            crc2.closePath();
            crc2.fill(cell);
            crc2.restore();
            crc2.save();
            crc2.translate(_position.x, _position.y);
            // Farbe Zellen
            crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            crc2.fill();
            // Linienfarbe
            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }
    }
    function drawKillercells() {
        console.log("Killercells");
    }
    function drawBloodcells(_position, _size) {
        console.log("Bloodcells");
        let nBloodcells = 9;
        for (let i = 0; i < nBloodcells; i++) {
            crc2.save();
            let cell = new Path2D();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            // Ellipse
            crc2.beginPath();
            crc2.ellipse(_position.x, _position.y, _size.x, _size.y, Math.PI / 1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.stroke();
            crc2.fill(cell);
            crc2.restore();
            crc2.save();
            crc2.translate(_position.x, _position.y);
            // Farbe Zellen
            crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            crc2.fill();
            // Linienfarbe
            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }
    }
})(L08_Virus || (L08_Virus = {}));
//# sourceMappingURL=Virus_script.js.map