namespace MagicCanvas {
    export class canvasElement {
        public position: Vector;
        public velocity: Vector;
        public size: number;
        public color: string;
        public form: string;
        public rotateangle: number;
        public animationtype: string;

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

        public draw(): void {
            let r: number = 20;
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);
            crc2.beginPath();
            crc2.arc(0, 0, r, 0, 2 * Math.PI);
            crc2.closePath();

            crc2.restore();

            // Linienfarbe
            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }

        public move(_timeslice: number): void {
            // console.log("Moveable move");
            let offset: Vector = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0) {
                this.position.x += crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += crc2.canvas.height;
            }
            if (this.position.x > crc2.canvas.width) {
                this.position.x -= crc2.canvas.width;
            }
            if (this.position.y > crc2.canvas.height) {
                this.position.y -= crc2.canvas.height;
            }
        }
    }
}    