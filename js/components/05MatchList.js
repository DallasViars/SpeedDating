import { header, main, footer, participantsList } from "../index.js";

export function renderMatchesListHTML() {
  header.innerHTML = getMLHeaderHTML();
  main.innerHTML = getMLMainHTML();
  footer.innerHTML = getMLFooterHTML();
}
function getMLHeaderHTML() {
  return `<h2>Click on a name to generate their matches letter</h2>`
}
function getMLMainHTML() {
  const savedList = participantsList.filter(item => item.hasBeenSaved);
  if (!savedList.length) {
    return `
      <div class="main__container">
        <p>There are no saved profiles, please go back and enter the participant's matches</p>
      </div>
    `
  }
  let html = `
    <div class="main__container">
      <ul>
  `
  html += savedList.map(participant => {
    const { id, name, hasBeenProcessed } = participant;
    return `
      <li data-list-id="${id}" class="main__list--item ${hasBeenProcessed ? "checked" : ""}"
        ${hasBeenProcessed ? "title='This participant has already been processed'" : ""}
        tabindex="0">
        ${name}
      </li>
    `
  }).join("");
  html += `
      </ul>
    </div>
  `
  return html;
}
function getMLFooterHTML() {
  return `<button id="btn-enter-matches" class="btn btn--wide">Back to Enter matches</button>`
}