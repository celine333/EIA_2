namespace MagicCanvas {

    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#canvasForm");

    window.addEventListener("load", handleLoad);
    
    function handleLoad(_event: Event): void {

        document.querySelector("#rules").addEventListener("click", rulesVisibility);
        handleCanvasSize();
        generateSymbols(_event);
    }
    
    function rulesVisibility(): void {
        console.log("show rules");
        let rulesdiv: HTMLElement = <HTMLElement>document.querySelector("#overlay");

        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        } else {
            rulesdiv.style.display = "none";
        }
    }

    function handleCanvasSize(): void {
        console.log("hallo");
        // let formData: FormData = new FormData(document.forms[0]);
        let radios: HTMLInputElement = document.querySelector("#radio");

        // for (let entry of formData) {
        //     if (radios.checked) {
        //         console.log("Value:" + entry[1]);
        //     }
        // }
        // console.log("Value:" + radios.value);
        // for (let i: number = 0; i < radios.length; i++) {
        //     let value = (<HTMLInputElement>document.querySelector("input[name = canvassize]:checked")).value;
        //     console.log("value:" + value);
        // }
        // for (let i: number = 0; i < radios.; i++) {
        //     if (radios.checked == true) {
        //         console.log("Value:" + radios.value); 
        //     }
        // }
        
        if (radios.checked) {
            let value = radios.value;
            console.log("value:" + value);
          }
    }
    
    function generateSymbols (_event: Event): void {
        console.log("generate Symbols");
    }
    
}