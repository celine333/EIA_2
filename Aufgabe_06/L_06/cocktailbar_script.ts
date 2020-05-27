namespace L05_Cocktailbar {
    window.addEventListener("load", handleLoad);

    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#form");
    let url: string = "http://localhost:5001";

    async function handleLoad(_event: Event): Promise<void> {
        console.log("init");

        let response: Response = await fetch("Data.json");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);

        generateContent(data);

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        console.log(submit);

        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
        submit.addEventListener("click", sendOrder);

        displayOrder();
    }

    async function sendOrder(_event: Event): Promise<void> {
        console.log("send order");
        let formData: FormData = new FormData (form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch((url) + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }

    function handleChange(_event: Event): void {
        displayOrder();
    }

    function displayOrder(): void {
        let price: number = 0;
        let order: HTMLDivElement = <HTMLDivElement>document.querySelector("div#order");
        order.innerHTML = "";
        
        let formData: FormData = new FormData(form);

        for (let entry of formData) {
            console.log(entry);
            let selector: string = "[value='" + entry[1] + "']";
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);
            let itemprice: number = Number(item.getAttribute("price"));
            switch (entry[0]) {
                case "Amount":
                    break;
                case "Drink":
                    let amount: number = Number(formData.get("Amount"));
                    itemprice = amount * itemprice;
                    order.innerHTML += amount + " L " + item.value + ": €" + itemprice + "<br>";
                    break;
                default:
                    order.innerHTML += item.value + ": €" + itemprice.toFixed(2) + "<br>";
            }
            price += itemprice;
        }
        order.innerHTML += "<p><strong>Total: € " + price.toFixed(2); 
    }

    function displayAmount(_event: Event): void {
        let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
        let amount: string = (<HTMLInputElement>_event.target).value;
        progress.value = parseFloat(amount);
    }
}