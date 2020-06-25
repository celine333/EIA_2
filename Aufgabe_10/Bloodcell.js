"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Bloodcell extends L10_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Bloodcell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L10_Virus.Vector(0, 0);
            this.velocity = new L10_Virus.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        draw() {
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L10_Virus.crc2.scale(this.size, this.size);
            L10_Virus.crc2.translate(-50, -50);
            // Ellipse
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.ellipse(this.position.x, this.position.y, 10, 5, Math.PI / 1, 0, 2 * Math.PI);
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.stroke();
            L10_Virus.crc2.fill();
            L10_Virus.crc2.restore();
            // Farbe Zellen
            L10_Virus.crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            L10_Virus.crc2.fill();
            // Linienfarbe
            L10_Virus.crc2.strokeStyle = "#FBAFAF";
            L10_Virus.crc2.stroke();
        }
    }
    L10_Virus.Bloodcell = Bloodcell;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Bloodcell.js.map