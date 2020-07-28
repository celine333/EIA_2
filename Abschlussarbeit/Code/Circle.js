var MagicCanvas;
(function (MagicCanvas) {
    var Circle = /** @class */ (function () {
        function Circle(_position) {
            if (_position)
                this.position = _position;
            else
                this.position = new MagicCanvas.Vector(0, 0);
        }
        Circle.prototype.draw = function () {
            var r = 4;
            MagicCanvas.crc2.save();
            MagicCanvas.crc2.translate(40, 40);
            // Skalierung vertikal und horizontal
            MagicCanvas.crc2.scale(5, 5);
            // crc2.translate(-50, -50);
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.arc(0, 0, r, 0, 2 * Math.PI);
            MagicCanvas.crc2.closePath();
            MagicCanvas.crc2.restore();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
        };
        return Circle;
    }());
    MagicCanvas.Circle = Circle;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Circle.js.map