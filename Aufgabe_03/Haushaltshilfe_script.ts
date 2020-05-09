namespace L03_Homehelper {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Die Anwendung startet");

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);

        let addButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#addrow");
        addButton.addEventListener("click", shoppingList);

        let order: HTMLInputElement = <HTMLInputElement>document.querySelector("#form");
        order.addEventListener("change", displayOrder);
    }

    function shoppingList(_event: MouseEvent): void {
        console.log("clicked");
        // Find a <table> element with id="myTable":
        let table: HTMLTableElement = <HTMLTableElement>document.querySelector("#shop");

        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = table.insertRow(1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        // Add some text to the new cells:
        cell1.innerHTML = "<input placeholder=\"Artikel\">";
        cell2.innerHTML = "<input placeholder=\"Menge+Einheit\">";
        cell3.innerHTML = "<input placeholder=\"Kosten\">";
        cell4.innerHTML = "<input placeholder=\"Ort\">";
        cell5.innerHTML = "<td id=\"trash\"><i class=\"fas fa-trash-alt\"></i></td>";

        let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#trash");
        deleteButton.addEventListener("click", mydelete);

        function mydelete(): void {
            // table.deleteRow(link.parentNode.parentNode.rowIndex);
            // let index = row()

            table.deleteRow(1);
        }
        displayOrder(_event);
    }


    function displayAmount(_event: Event): void {
        let value: string = (<HTMLInputElement>_event.target).value;
        let text: HTMLElement = <HTMLElement>document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }

    function displayOrder(_event: Event): void {
        let household: HTMLInputElement = <HTMLInputElement>document.querySelector("#home");
        let bank: HTMLInputElement = <HTMLInputElement>document.querySelector("#bank");
        let cash: HTMLInputElement = <HTMLInputElement>document.querySelector("#cash");

        for (let i: number = 0; i < 1; i++) {
            let item: HTMLInputElement = (<HTMLInputElement>_event.target);
            let value = item.value;
            let spanElement: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#list");
            let price: number = Number(item.getAttribute("price"));
            console.log(price);
            if (household.checked == true) {
                spanElement.innerHTML += "<br>" + value + " " + price + "€";
            } else if (bank.checked == true) {
                spanElement.innerHTML += "<br>" + value + " " + price + "€";
            } else if (cash.checked == true) {
                spanElement.innerHTML += "<br>" + value + " " + price + "€";
            } else {
                spanElement.innerHTML += value + " ";
            }
        }
    }
}
