function hilightCurrentDay() {
    let d = new Date();

    day = d.getDay();

    console.log("day index -", day);

    if (day < 6 && day > 0) {
        document
            .getElementById("day-" + day)
            .classList
            .add("highlighted");
    }
}

async function loadData() {
    let response = await fetch("table.csv");
    let data = await response.text();
    let table = data.split("\n").map(a => a.split(",").map(b => b.trim()));
    for (let weekday = 0; weekday < 5; weekday++) {
        let tableEllement = document.createElement("table");
        let tableBodyEllement = document.createElement("tbody");
        for (let row of table) {
            let rowEllement = document.createElement("tr");
            for (let i = 0; i < 2; i++) {
                let elt = row[i + weekday * 2];
                if (!elt) break;
                if (elt != '~') {
                    let dataEllement = document.createElement("td");
                    dataEllement.appendChild(document.createTextNode(elt));
                    rowEllement.appendChild(dataEllement);
                } else {
                    rowEllement.lastChild.colSpan = 2;
                    rowEllement.lastChild.className = "title"
                }
            }
            tableBodyEllement.appendChild(rowEllement);
        }
        tableEllement.appendChild(tableBodyEllement);
        tableEllement.id = "day-" + (weekday + 1);
        // console.table(table);
        document.getElementById("tables-container").appendChild(tableEllement);
    }
}

loadData().then(_ =>
    hilightCurrentDay()
);