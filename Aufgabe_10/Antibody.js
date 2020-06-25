"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Antibody extends L10_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Antibody constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Virus.Vector(0, 0);
            this.velocity = new L10_Virus.Vector(0, 0);
            this.velocity.random(40, 100);
            this.size = _size;
        }
        draw() {
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L10_Virus.crc2.scale(this.size, this.size);
            L10_Virus.crc2.translate(-50, -50);
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.moveTo(this.position.x, this.position.y);
            L10_Virus.crc2.lineTo(10, -8);
            L10_Virus.crc2.moveTo(this.position.x, this.position.y);
            L10_Virus.crc2.lineTo(-10, 8);
            // crc2.lineWidth = 50; 
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
            L10_Virus.crc2.restore();
            // Linienfarbe
            L10_Virus.crc2.strokeStyle = "#FFFFFF";
            L10_Virus.crc2.stroke();
        }
    }
    L10_Virus.Antibody = Antibody;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Antibody.js.map