function createPersonsTable(persons) {
    let table = document.getElementById("personsTable");

    for (let person of persons) {
        let row = document.createElement("tr");

        let idCell = document.createElement("td");
        idCell.setAttribute("data-location", person._links.self.href);
        idCell.setAttribute("data-action", "show-person");
        idCell.innerText = person.id;
        row.append(idCell);

        let firstNameCell = document.createElement("td");
        firstNameCell.innerText = person.first_name;
        firstNameCell.setAttribute("data-location", person._links.self.href);
        firstNameCell.setAttribute("data-action", "show-person");
        row.append(firstNameCell);

        let lastNameCell = document.createElement("td");
        lastNameCell.innerText = person.last_name;
        lastNameCell.setAttribute("data-location", person._links.self.href);
        lastNameCell.setAttribute("data-action", "show-person");
        row.append(lastNameCell);

        let deleteImage = document.createElement("td");
        deleteImage.setAttribute("class", "deleteIcon");
        deleteImage.innerHTML = `<span class="fa fa-trash deleteIcon" aria-hidden="true" data-persid=${person.id} data-location=${person._links.self.href} data-action="delete"></span>`;
        row.append(deleteImage);

        table.append(row);
    }
}

export function getPersons() {
    fetch('http://localhost:3000/api/personen/')
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(persons => {
            createPersonsTable(persons)
        })
}

export function deletePerson(href) {
    fetch(href, {method: 'DELETE'})
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(person => {
            alert(`Persoon met id: ${person.id} en naam: ${person.first_name}, werd succesvol verwijderd.`);
        });
}

export function getPerson(href) {
    fetch(href)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(person => {
            let personId = document.getElementById("personIdHeader");
            personId.innerText = "ID: " + person.id;

            document.getElementById("voornaam").value = person.first_name;
            document.getElementById("geboortedatum").value = person.birth_day;

            if (person.gender.toUpperCase() === "M") {
                document.getElementById("geslacht").options[0].selected = true;
            } else {
                document.getElementById("geslacht").options[1].selected = true
            }

            document.getElementById("achternaam").value = person.last_name;
            document.getElementById("jarenDienst").value = person.yearsService;

            if (person.married === true) {
                document.getElementById("gehuwd").checked = true;
            } else {
                document.getElementById("gehuwd").checked = false;
            }


            document.getElementById("personImage").setAttribute("src", person.image);
            document.getElementById("personImage").setAttribute("alt", person.first_name);

            getCars(person.id);
        });
}

function getCars(personId) {
    fetch(`http://localhost:3000/api/personen/${personId}/cars`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(cars => {
            let container = document.getElementById("carContainer");
            let htmlString = "";
            for (let car of cars) {
                let string = `<div class="col-md-6 col-lg-4 col-xl-3"><div class="card my-3"><div class="card-header"><div ` +
                    `class="row"><p class="col-9 text-left">${car.license}</p><p class="col-3 text-right">${car.id}</p>` +
                    `</div></div><div class="card-body"><p class="lead">${car.brand}</p><p>${car.model}</p></div></div></div>`;
                htmlString += string;
            }
            container.innerHTML = htmlString;
        })
}

export async function createNewPerson(ev) {
    let persName = document.getElementById("voornaam").value;

    const formdata = new FormData(document.getElementById("personForm"));
    formdata.append("image", `https://via.placeholder.com/200x80.png?text=${persName}`);

    let response = await fetch("http://localhost:3000/api/personen/", {
        method: "POST",
        body: formdata
    });
    let person = await response.json();
    return person;
}

export function zoekPersoon() {
    let zoekstring = document.getElementById("zoeken").value;

    fetch(`http://localhost:3000/api/personen?zoekstring=${zoekstring}`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(persons => {
            createPersonsTable(persons)
        })
}
