var MagicCanvas;
(function (MagicCanvas) {
    var CanvasElement = /** @class */ (function () {
        function CanvasElement(_form, _color, _animation, _position) {
            this.directionx = 1;
            this.directiony = 1;
            this.angle = 0;
            this.size = 0;
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
        CanvasElement.prototype.animate = function (canvasWidth, canvasHeight) {
            if (this.selectedanimation == "position") {
                MagicCanvas.xpos = this.position.x;
                MagicCanvas.ypos = this.position.y;
                // rechts
                if (MagicCanvas.xpos + this.size > canvasWidth)
                    // -1 damit es sich in die entgegengesetze Richtung weiter bewegt
                    this.directionx = -1;
                // unten    
                if (MagicCanvas.ypos + this.size > canvasHeight)
                    this.directiony = -1;
                // links    
                if (MagicCanvas.xpos < 0)
                    this.directionx = 1;
                // oben    
                if (MagicCanvas.ypos < 0)
                    this.directiony = 1;
                // Bewegung wird hinzugefügt dass es in die richtige Richtung fliegt
                MagicCanvas.xpos = MagicCanvas.xpos + this.directionx;
                MagicCanvas.ypos = MagicCanvas.ypos + this.directiony;
                // aktualisierte Positionen
                this.position.x = MagicCanvas.xpos;
                this.position.y = MagicCanvas.ypos;
            }
            else if (this.selectedanimation == "rotate") {
                if (this.angle < 360)
                    // Winkel wird immer um 1 vergrößert (eig Canvas gedreht)
                    this.angle = this.angle + 1;
                else
                    this.angle = 0;
            }
            // immer neu zeichnen, damit sie immer eine neue Position haben können
            this.draw();
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
            var r = 20;
            this.size = 20;
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.arc(this.position.x + this.size, this.position.y + this.size, r, 0, 2 * Math.PI);
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
            this.size = 40;
            if (this.selectedanimation == "rotate") {
                // Matrix transformation
                MagicCanvas.crc2.translate(this.position.x + (this.size / 2), this.position.y + (this.size / 2));
                MagicCanvas.crc2.rotate(this.angle * Math.PI / 180);
                MagicCanvas.crc2.translate(-1 * (this.position.x + (this.size / 2)), -1 * (this.position.y + (this.size / 2)));
            }
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.moveTo(this.position.x + 20, this.position.y + 0);
            MagicCanvas.crc2.lineTo(this.position.x + 40, this.position.y + 40);
            MagicCanvas.crc2.lineTo(this.position.x + 0, this.position.y + 40);
            MagicCanvas.crc2.closePath();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
            if (this.selectedanimation == "rotate") {
                // Matrix transformation
                MagicCanvas.crc2.translate(this.position.x + (this.size / 2), this.position.y + (this.size / 2));
                MagicCanvas.crc2.rotate(-this.angle * Math.PI / 180);
                MagicCanvas.crc2.translate(-1 * (this.position.x + (this.size / 2)), -1 * (this.position.y + (this.size / 2)));
            }
        };
        CanvasElement.prototype.drawSquare = function () {
            this.size = 40;
            if (this.selectedanimation == "rotate") {
                // Matrix transformation
                MagicCanvas.crc2.translate(this.position.x + (this.size / 2), this.position.y + (this.size / 2));
                MagicCanvas.crc2.rotate(this.angle * Math.PI / 180);
                MagicCanvas.crc2.translate(-1 * (this.position.x + (this.size / 2)), -1 * (this.position.y + (this.size / 2)));
            }
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.rect(this.position.x, this.position.y, 55, 40);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
            if (this.selectedanimation == "rotate") {
                // Matrix transformation
                MagicCanvas.crc2.translate(this.position.x + (this.size / 2), this.position.y + (this.size / 2));
                MagicCanvas.crc2.rotate(-this.angle * Math.PI / 180);
                MagicCanvas.crc2.translate(-1 * (this.position.x + (this.size / 2)), -1 * (this.position.y + (this.size / 2)));
            }
        };
        CanvasElement.prototype.drawFlash = function () {
            this.size = 20;
            if (this.selectedanimation == "rotate") {
                // Matrix transformation
                MagicCanvas.crc2.translate(this.position.x + (this.size / 2), this.position.y + (this.size / 2));
                // Canvas wird um einen kleinen Winkel rotiert
                MagicCanvas.crc2.rotate(this.angle * Math.PI / 180);
                MagicCanvas.crc2.translate(-1 * (this.position.x + (this.size / 2)), -1 * (this.position.y + (this.size / 2)));
            }
            MagicCanvas.crc2.beginPath();
            // crc2.translate(40, 40);
            MagicCanvas.crc2.moveTo(this.position.x, this.position.y);
            MagicCanvas.crc2.lineTo(this.position.x + 20, this.position.y);
            MagicCanvas.crc2.lineTo(this.position.x + 15, this.position.y + 25);
            MagicCanvas.crc2.lineTo(this.position.x + 25, this.position.y + 25);
            MagicCanvas.crc2.lineTo(this.position.x + 10, this.position.y + 50);
            MagicCanvas.crc2.moveTo(this.position.x, this.position.y);
            MagicCanvas.crc2.lineTo(this.position.x, this.position.y + 30);
            MagicCanvas.crc2.lineTo(this.position.x + 12, this.position.y + 30);
            MagicCanvas.crc2.lineTo(this.position.x + 10, this.position.y + 50);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
            if (this.selectedanimation == "rotate") {
                // Matrix transformation
                MagicCanvas.crc2.translate(this.position.x + (this.size / 2), this.position.y + (this.size / 2));
                MagicCanvas.crc2.rotate(-this.angle * Math.PI / 180);
                MagicCanvas.crc2.translate(-1 * (this.position.x + (this.size / 2)), -1 * (this.position.y + (this.size / 2)));
            }
        };
        return CanvasElement;
    }());
    MagicCanvas.CanvasElement = CanvasElement;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=CanvasElement.js.map