namespace L09_Virus {
    export let virusPaths: Path2D[];
    export let antibodyPaths: Path2D[];
    export let killercellPaths: Path2D[];
    export let bloodcellPaths: Path2D[];

    export function createPaths(): void {
        asteroidPaths = createAsteroidPaths(shapeAsteroids);
        // eigene Funktion von draw Virus einfügen
        virusPaths = createVirusPaths();
        antibodyPaths = createAntibodyPaths();
        killercellPaths = createKillercellPaths();
        bloodcellPaths = createBloodcellPaths();

    }

}