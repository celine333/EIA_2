namespace L03_Homehelper {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Die Anwendung startet");

        let order: HTMLInputElement = <HTMLInputElement>document.querySelector("#form");
        order.addEventListener("change", displayOrder);

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
    }

    function displayAmount(_event: Event): void {
        let value: string = (<HTMLInputElement>_event.target).value;
        let text: HTMLElement = <HTMLElement>document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }

    function displayOrder(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");
        order.innerHTML = "";
        let formData: FormData = new FormData(document.forms[0]);

        for (let entry of formData) {
            console.log("Entry:" + entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");

            if (entry[0] == "Datalist") {
                let portion: number = Number(formData.get("Menge"));
                let price: number = Number(item.getAttribute("price"));
                order.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                let unit: string = String(item.getAttribute("unit"));
                console.log("unit:" + unit);
                order.innerHTML += "" + unit + ":";
            } else if (entry[0] == "Menge") {
                let portion: number = Number(formData.get("Menge"));
                order.innerHTML += "" + portion + "|";
            } else if (entry[0] == "DatalistSupermarkt") {
                order.innerHTML += " " + entry[1];
            } else if (entry[0] == "Home") {
                let price: number = Number(item.getAttribute("price"));
                order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " ";
            } else if (entry[0] == "Bank") {
                let price: number = Number(item.getAttribute("price"));
                order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + "|";  
            } else if (entry[0] == "Amount") {
                order.innerHTML += " " + entry[1] + "€";
            } else if (entry[0] == "cash") {
                order.innerHTML += "<br>" + "" + entry[1];
            } else {
                console.log("default");
            }
            
        }
    }

}
