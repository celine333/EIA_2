namespace MagicCanvas {
    export class Circle {
        public position: Vector;
        public color: string;
        

        constructor(_position?: Vector) {
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);
        }

        draw(): void {
            let r: number = 4;
            crc2.save();
            crc2.translate(40, 40);
            // Skalierung vertikal und horizontal
            crc2.scale(5, 5);
            // crc2.translate(-50, -50);
            crc2.beginPath();
            crc2.arc(0, 0, r, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.restore();
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
        }

    }
}