import { header, main, footer, participantsList } from "../index.js";
import * as utils from "./utils.js";

export function renderEnterMatchesHTML(id) {
  header.innerHTML = getEMHeaderHTML(id);
  main.innerHTML = getEMMainHTML(id);
  footer.innerHTML = getEMFooterHTML(id);
  main.firstChild.scrollIntoView(true);
}
function getEMHeaderHTML(id) {
  id = Number(id);
  const participantInfo = utils.getParticipant(id);
  let { name, hasBeenSaved } = participantInfo[0];
  return `
    <p class="wide100 ${hasBeenSaved ? "checked" : ""}" ${hasBeenSaved ? "title='" + name + " has already been saved'" : ""}>${name}</p>
    <button id="btn-prev" data-id=${id === 1 ? participantsList.length : id - 1} class="btn">Previous</button>
    <button id="btn-next" data-id=${id === participantsList.length ? 1 : id + 1} class="btn">Next</button>
  `
}
function getEMMainHTML(mainId) {
  const mainParticipant = utils.getParticipant(mainId);
  let html = `<div class="main__container flex col gap1">`
  html += participantsList.map(participant => {
    if (Number(mainId) === Number(participant.id)) { return }
    const { id, name } = participant;
    const isFriend = Boolean(mainParticipant[0].friends[id])
    const isRomance = Boolean(mainParticipant[0].romance[id])
    return `
      <div class="match__info">
        <p class="match__name wide100">${name}</p>
        <label for="friend-${id}" class="match__info--input-label">
        <input id="friend-${id}" data-friend-id=${id} class="match__info--input-label" type="checkbox" ${isFriend ? "checked" : ""}>
        Friend</label>

        <label for="romance-${id}" class="match__info--input-label">
        <input id="romance-${id}" data-romance-id=${id} class="match__info--input-label" type="checkbox" ${isRomance ? "checked" : ""}>
        Romance</label>
      </div>
    `
  }).join("");
  html += `
      <button id="btn-save-matches" data-user-id=${mainId} class="btn">Save Matches</button>
    </div>
  `
  return html;
}
function getEMFooterHTML() {
  return `
    <button id="btn-show-list" class="btn">Back</button>
    <button id="btn-get-matches-list" class="btn">Matches List</button>
  `
}

