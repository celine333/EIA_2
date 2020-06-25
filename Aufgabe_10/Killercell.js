"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Killercell extends L10_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Killercell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L10_Virus.Vector(0, 0);
            this.velocity = new L10_Virus.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        draw() {
            let radius = 15;
            let gradient = L10_Virus.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L10_Virus.crc2.scale(this.size, this.size);
            L10_Virus.crc2.translate(-50, -50);
            L10_Virus.crc2.fillStyle = gradient;
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
            L10_Virus.crc2.restore();
        }
        isHit(_virusposition) {
            let hitsize = 15 * this.size;
            let difference = new L10_Virus.Vector(_virusposition.x - this.position.x, _virusposition.y - this.position.y);
            // && = beide Werte müssen kleiner sein
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L10_Virus.Killercell = Killercell;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Killercell.js.map