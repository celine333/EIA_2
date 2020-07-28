namespace MagicCanvas {
    export class canvasElement {
        public position: Vector;
        public velocity: Vector;
        // public size: number;
        public selectedcolor: string;
        public selectedform: string;
        // public rotateangle: number;
        public selectedanimation: string;
        // ELement ist aktiv wenn es nicht mehr in der Mitte ist
    //     active: boolean;

        constructor(_position?: Vector) {
            // super(_position);

            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(20, 80);

            // if (_selectedform)
            //     crc2.fillStyle = _selectedcolor;
            // crc2.fill();   
            
        }

        public drawCircle(): void {
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

        public drawTriangle(): void {
            crc2.beginPath();
            crc2.moveTo(70, 70);
            crc2.lineTo(10, 70);
            crc2.lineTo(10, 25);
            crc2.closePath();
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
        }

        public drawRectangle(): void {
            crc2.beginPath();
            crc2.rect(10, 10, 55, 40);
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
        }

        public drawFlash(): void {
            crc2.beginPath();
            crc2.translate(40, 40);
            crc2.moveTo(0, 0);
            crc2.lineTo(20, 0);
            crc2.lineTo(15, 25);
            crc2.lineTo(25, 25);
            crc2.lineTo(10, 50);
            crc2.moveTo(0, 0);
            crc2.lineTo(0, 30);
            crc2.lineTo(12, 30);
            crc2.lineTo(10, 50);
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
        }

        // public move(_timeslice: number): void {
        //     // console.log("Moveable move");
        //     let offset: Vector = this.velocity.copy();
        //     offset.scale(_timeslice);
        //     this.position.add(offset);

        //     if (this.position.x < 0) {
        //         this.position.x += crc2.canvas.width;
        //     }
        //     if (this.position.y < 0) {
        //         this.position.y += crc2.canvas.height;
        //     }
        //     if (this.position.x > crc2.canvas.width) {
        //         this.position.x -= crc2.canvas.width;
        //     }
        //     if (this.position.y > crc2.canvas.height) {
        //         this.position.y -= crc2.canvas.height;
        //     }
        // }
    }
}    