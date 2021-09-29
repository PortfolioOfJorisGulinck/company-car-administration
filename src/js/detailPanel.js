import * as restClient from './restClient';
import * as commonUI from './commonUI';
import * as lijstPanel from './lijstPanel';

export default function init() {
    // eventlistener bij het klikken op de ANNULEER knop
    document.getElementById("cancelButton").addEventListener("click", () => {
        commonUI.makeFormDisabled();
        commonUI.toggleButtons();
        commonUI.changePage();
        lijstPanel.fillPersonsTable();

    });

    // eventlistener bij het submitten op de formdata
    document.getElementById("personForm").addEventListener("submit", ev => {
        ev.preventDefault();

        if (!validateForm()) {
            document.getElementById("geboortedatum").classList.add("is-invalid"); // server side validation
        } else {
            document.getElementById("geboortedatum").classList.remove("is-invalid"); // server side validation
            const person = restClient.createNewPerson(ev);
            commonUI.toggleButtons();
            fillPersonTable(person._links.self.href);
            commonUI.makeFormDisabled();
            alert(`Persoon met id: ${person.id} en naam: ${person.first_name}, werd succesvol aangemaakt.`);
        }
    });

    // eventlistener bij het klikken op de NIEUW button
    document.getElementById("newButton").addEventListener("click", emptyForm);

    // eventlistener bij het klikken op de TOON ALLE PERSONEN button
    document.getElementById("allPersonsButton").addEventListener("click", () => {
        lijstPanel.fillPersonsTable();
        commonUI.changePage();
    });
}

/* Vullen en verwijderen van de form van de geselecteerde persoon*/

/*---------------------------------------------------------------*/
function emptyCarTable() {
    document.getElementById("carContainer").innerHTML = "";
}

export function fillPersonTable(href) {
    emptyCarTable();
    restClient.getPerson(href);

}

/* click event bij het aanklikken van de NIEUW PERSOON button*/

/*-----------------------------------------------------------*/
function emptyForm() {
    let personId = document.getElementById("personIdHeader");
    personId.innerText = "";

    document.getElementById("voornaam").value = null;
    document.getElementById("geboortedatum").value = null;
    document.getElementById("achternaam").value = null;
    document.getElementById("jarenDienst").value = null;
    document.getElementById("gehuwd").checked = false;
    document.getElementById("personImage").removeAttribute("src");
    document.getElementById("personImage").removeAttribute("alt");

    commonUI.makeFormEnabled();
    commonUI.toggleButtons();
    emptyCarTable();
}

// SERVER SIDE VALIDATION
function validateForm() {
    let inhoud = document.getElementById("geboortedatum").value.split("-");
    let geboorteJaar = inhoud[0];
    let huidigJaar = new Date().getFullYear();
    let leeftijd = huidigJaar - geboorteJaar;
    console.log(leeftijd);
    if (leeftijd > 15 && leeftijd < 68) {
        return true;
    }
    return false;

    /*
    VOORBEELD MET FORM.CHECKVALIDITY()

    let formdata = document.querySelector("form");
    formdata.addEventListener('submit', ev => {
        if (form.checkValidity() === false) {
            ev.preventDefault()
        }
        formdata.classList.add('was-validated');
    })
    */


}