import { header, main, footer, participantsList } from "../index.js";

export function renderParticipantsListHTML() {
  header.innerHTML = getPLHeaderHTML();
  main.innerHTML = getPLMainHTML();
  footer.innerHTML = getPLFooterHTML();
}
function getPLHeaderHTML() {
  return `<h2>Click on a name to begin</h2>`;
}
function getPLMainHTML() {
  let html = `<div class="main__container">`
    
  if (Object.keys(participantsList).length) {
    html += `<ul>`
    for (let participant in participantsList) {
      const { id, name, hasBeenSaved } = participantsList[participant];
      html += `<li class="main__list--item ${hasBeenSaved ? "checked" : ""}" ${hasBeenSaved ? "title='" + name + " has already been saved'" : ""} data-id=${id} tabindex="0">${name}</li>`
    }
    html += `
        </ul>
      </div>
    `
  } else {
    return `
        <p>There are no participants listed, please click on the "Back to Add Person" button to enter participant data</p>
      </div>
    `
  }
  
  return html;
}
function getPLFooterHTML() {
  return `<button id="back-to-add-person" class="btn btn--wide">Back to add person</button>`
}