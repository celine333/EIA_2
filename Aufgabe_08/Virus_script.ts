namespace L08_Virus {

    interface Vektor {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawBloodvessel({x: 562.5, y:200});
        drawPattern();
        drawVirus();
        drawAntibody();
        drawKillercells();
        drawBloodcells();
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "black");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawBloodvessel(_position: Vektor): void {
        console.log("Bloodvessel");

    }
    
    function drawPattern(): void {
        console.log("Pattern");
    }
    
    function drawVirus(): void {
        console.log("Virus");
    }
    
    function drawAntibody(): void {
        console.log("Antibody");
    }
    
    function drawKillercells(): void {
        console.log("Killercells");
    }
    
    function drawBloodcells(): void {
        console.log("Bloodcells");
    }
}