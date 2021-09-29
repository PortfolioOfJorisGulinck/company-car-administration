import * as restClient from './restClient';
import * as commonUI from './commonUI';
import * as detailPanel from './detailPanel';

export default function init() {
    // opvullen personstabel
    fillPersonsTable();

    // eventlistener bij het klikken op de tabel
    document.getElementById("personsTable").addEventListener("click", useClickEvent);

    // eventlistener bij het klikken van de nav link naar de detailpagina
    document.getElementById("personDetailPageNavLink").addEventListener("click", personDetailPageNavLinkActions)

    // eventlistener bij het klikken op de ZOEK button
    document.getElementById("zoekform").addEventListener("submit", ev => {
        ev.preventDefault();
        emptyPersonsTable();
        restClient.zoekPersoon();
    });
}

/* Vullen en verwijderen van data in de personen tabel */
/*-----------------------------------------------------*/
export function fillPersonsTable() {
    emptyPersonsTable();
    restClient.getPersons();
}

function emptyPersonsTable() {
    document.querySelectorAll("#personsTable tr").forEach(tr => tr.remove());
}

/* click event bij het aanklikken van de tabel met personen*/
/*---------------------------------------------------------*/
function useClickEvent(ev) {
    let href = ev.target.dataset.location;
    let action = ev.target.dataset.action;

    if (action === "delete") {
        restClient.deletePerson(href);
        fillPersonsTable();
    }
    if (action === "show-person") {
        commonUI.changePage();
        detailPanel.fillPersonTable(href);
        commonUI.makeFormDisabled();
    }
}

/* click event bij het aanklikken van de nav link naar de detailpagina*/
/*--------------------------------------------------------------------*/
function personDetailPageNavLinkActions() {
    commonUI.changePage();
    commonUI.makeFormEnabled();
    commonUI.toggleButtons();
}