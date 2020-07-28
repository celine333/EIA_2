var MagicCanvas;
(function (MagicCanvas) {
    var canvasElement = /** @class */ (function () {
        function canvasElement() {
        }
        // ELement ist aktiv wenn es nicht mehr in der Mitte ist
        //     active: boolean;
        // constructor(_size: number, _position?: Vector) {
        //     // super(_position);
        //     if (_position)
        //         this.position = _position;
        //     else
        //         this.position = new Vector(0, 0);
        //     this.velocity = new Vector(0, 0);
        //     this.velocity.random(20, 80);
        //     this.size = _size;
        // }
        canvasElement.prototype.draw = function () {
            var r = 20;
            MagicCanvas.crc2.save();
            MagicCanvas.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            MagicCanvas.crc2.scale(this.size, this.size);
            MagicCanvas.crc2.translate(-50, -50);
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.arc(0, 0, r, 0, 2 * Math.PI);
            MagicCanvas.crc2.closePath();
            MagicCanvas.crc2.restore();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#FFFFFF";
            MagicCanvas.crc2.stroke();
        };
        canvasElement.prototype.move = function (_timeslice) {
            // console.log("Moveable move");
            var offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0) {
                this.position.x += MagicCanvas.crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += MagicCanvas.crc2.canvas.height;
            }
            if (this.position.x > MagicCanvas.crc2.canvas.width) {
                this.position.x -= MagicCanvas.crc2.canvas.width;
            }
            if (this.position.y > MagicCanvas.crc2.canvas.height) {
                this.position.y -= MagicCanvas.crc2.canvas.height;
            }
        };
        return canvasElement;
    }());
    MagicCanvas.canvasElement = canvasElement;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Circle.js.map