var MagicCanvas;
(function (MagicCanvas) {
    var canvasElement = /** @class */ (function () {
        // ELement ist aktiv wenn es nicht mehr in der Mitte ist
        //     active: boolean;
        function canvasElement(_position) {
            // super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new MagicCanvas.Vector(0, 0);
            this.velocity = new MagicCanvas.Vector(0, 0);
            this.velocity.random(20, 80);
            // if (_selectedform)
            //     crc2.fillStyle = _selectedcolor;
            // crc2.fill();   
        }
        canvasElement.prototype.drawCircle = function () {
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
        canvasElement.prototype.drawTriangle = function () {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.moveTo(70, 70);
            MagicCanvas.crc2.lineTo(10, 70);
            MagicCanvas.crc2.lineTo(10, 25);
            MagicCanvas.crc2.closePath();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
        };
        canvasElement.prototype.drawRectangle = function () {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.rect(10, 10, 55, 40);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
        };
        canvasElement.prototype.drawFlash = function () {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.translate(40, 40);
            MagicCanvas.crc2.moveTo(0, 0);
            MagicCanvas.crc2.lineTo(20, 0);
            MagicCanvas.crc2.lineTo(15, 25);
            MagicCanvas.crc2.lineTo(25, 25);
            MagicCanvas.crc2.lineTo(10, 50);
            MagicCanvas.crc2.moveTo(0, 0);
            MagicCanvas.crc2.lineTo(0, 30);
            MagicCanvas.crc2.lineTo(12, 30);
            MagicCanvas.crc2.lineTo(10, 50);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
        };
        return canvasElement;
    }());
    MagicCanvas.canvasElement = canvasElement;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=CanvasElement.js.map