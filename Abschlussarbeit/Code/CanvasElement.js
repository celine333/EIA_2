var MagicCanvas;
(function (MagicCanvas) {
    var CanvasElement = /** @class */ (function () {
        // public rotateangle: number;
        // ELement ist aktiv wenn es nicht mehr in der Mitte ist
        //     active: boolean;
        function CanvasElement(_form, _color, _animation, _position) {
            // super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new MagicCanvas.Vector(0, 0);
            this.velocity = new MagicCanvas.Vector(0, 0);
            this.velocity.random(20, 80);
            this.selectedform = _form;
            this.selectedcolor = _color;
            this.selectedanimation = _animation;
        }
        CanvasElement.prototype.animate = function () {
            if (this.selectedanimation == "position")
                this.move(20);
            else if (this.selectedanimation == "rotate")
                this.rotate();
        };
        CanvasElement.prototype.move = function (_timeslice) {
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
        CanvasElement.prototype.rotate = function () {
            // Matrix transformation
            MagicCanvas.crc2.save();
            MagicCanvas.crc2.translate(70, -10);
            // um 180 Grad rotieren
            MagicCanvas.crc2.rotate(Math.PI / 4);
        };
        CanvasElement.prototype.draw = function () {
            if (this.selectedform == "circle")
                this.drawCircle();
            else if (this.selectedform == "square")
                this.drawSquare();
            else if (this.selectedform == "triangle")
                this.drawTriangle();
            else if (this.selectedform == "flash")
                this.drawFlash();
        };
        CanvasElement.prototype.drawCircle = function () {
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
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        };
        CanvasElement.prototype.drawTriangle = function () {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.moveTo(70, 70);
            MagicCanvas.crc2.lineTo(10, 70);
            MagicCanvas.crc2.lineTo(10, 25);
            MagicCanvas.crc2.closePath();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        };
        CanvasElement.prototype.drawSquare = function () {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.rect(10, 10, 55, 40);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        };
        CanvasElement.prototype.drawFlash = function () {
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
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        };
        return CanvasElement;
    }());
    MagicCanvas.CanvasElement = CanvasElement;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=CanvasElement.js.map