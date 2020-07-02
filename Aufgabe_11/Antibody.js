"use strict";
var L11_Virus;
(function (L11_Virus) {
    class Antibody extends L11_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Antibody constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L11_Virus.Vector(0, 0);
            this.velocity = new L11_Virus.Vector(0, 0);
            this.velocity.random(40, 100);
            this.size = _size;
        }
        draw() {
            L11_Virus.crc2.save();
            L11_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L11_Virus.crc2.scale(this.size, this.size);
            L11_Virus.crc2.translate(-50, -50);
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.moveTo(this.position.x, this.position.y);
            L11_Virus.crc2.lineTo(10, -8);
            L11_Virus.crc2.moveTo(this.position.x, this.position.y);
            L11_Virus.crc2.lineTo(-10, 8);
            // crc2.lineWidth = 50; 
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
            L11_Virus.crc2.restore();
            // Linienfarbe
            L11_Virus.crc2.strokeStyle = "#FFFFFF";
            L11_Virus.crc2.stroke();
        }
    }
    L11_Virus.Antibody = Antibody;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Antibody.js.map