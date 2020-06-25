"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Virus extends L10_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Virus constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Virus.Vector(0, 0);
            this.velocity = new L10_Virus.Vector(0, 0);
            this.velocity.random(20, 80);
            this.size = _size;
        }
        draw() {
            // Radius
            let r1 = 20;
            let r2 = 7;
            let gradient = L10_Virus.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(100, 72%, 49%, 1)");
            gradient.addColorStop(1, "HSLA(100, 72%, 61%, 0.6)");
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(this.position.x, this.position.y);
            L10_Virus.crc2.fillStyle = gradient;
            // Skalierung vertikal und horizontal
            L10_Virus.crc2.scale(this.size, this.size);
            L10_Virus.crc2.translate(-50, -50);
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(0, 0, r1, 0, 2 * Math.PI);
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
            L10_Virus.crc2.restore();
            // crc2.stroke(virusPaths[this.size]);
        }
    }
    L10_Virus.Virus = Virus;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Virus.js.map