/* veranderen van pagina */
/*-----------------------*/
export function changePage() {
    document.getElementById("personsPage").classList.toggle("active");
    document.getElementById("personDetailPage").classList.toggle("active");
}

export function toggleButtons() {
    document.getElementById("newButton").classList.toggle("d-none");
    document.getElementById("allPersonsButton").classList.toggle("d-none");
    document.getElementById("saveButton").classList.toggle("d-none");
    document.getElementById("cancelButton").classList.toggle("d-none");
}

/* Maak de form invulbaar of niet meer invulbaar*/
/*----------------------------------------------*/
export function makeFormEnabled(){
    document.getElementById("voornaam").disabled = false;
    document.getElementById("geboortedatum").disabled = false;
    document.getElementById("geslacht").disabled = false;
    document.getElementById("achternaam").disabled = false;
    document.getElementById("jarenDienst").disabled = false;
    document.getElementById("gehuwd").disabled = false;

    document.getElementById("personImage").classList.add("d-none");
    document.getElementById("upload-form").classList.remove("d-none");
}

export function makeFormDisabled(){
    document.getElementById("voornaam").disabled = true;
    document.getElementById("geboortedatum").disabled = true;
    document.getElementById("geslacht").disabled = true;
    document.getElementById("achternaam").disabled = true;
    document.getElementById("jarenDienst").disabled = true;
    document.getElementById("gehuwd").disabled = true;

    document.getElementById("personImage").classList.remove("d-none");
    document.getElementById("upload-form").classList.add("d-none");
}

