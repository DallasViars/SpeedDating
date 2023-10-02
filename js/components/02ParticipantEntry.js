import { header, main, footer } from "../index.js";

export function renderParticipantEntryHTML() {
  header.innerHTML = getPEHeaderHTML();
  main.innerHTML = getPEMainHTML();
  footer.innerHTML = getPEFooterHTML();
}
function getPEHeaderHTML() {
  return `<h2>Please enter participant information below</h2>`
}
function getPEMainHTML() {
  return `
    <form class="form">
      <div class="input__container">
        <label for="name" class="form__label">name:</label>
        <input id="name" name="name" class="form--text" type="text" required>
      </div>
      <div class="input__container">
        <label for="discord" class="form__label">discord:</label>
        <input id="discord" name="discord" class="form--text" type="text">
      </div>
      <div class="input__container">
        <label for="email" class="form__label">email:</label>
        <input id="email" name="email" class="form--text" type="email" required>
      </div>
      <div class="input__container">
        <label for="facebook" class="form__label">facebook:</label>
        <input id="facebook" name="facebook" class="form--text" type="text">
      </div>
      <div class="input__container">
        <label for="location" class="form__label">location:</label>
        <input id="location" name="location" class="form--text" type="text">
      </div>
      <div class="input__checkbox--container">
        <p class="placeholder">Pronouns:</p>
        <div class="grid-he">
          <input id="he" name="he" class="input__checkbox label--he" type="checkbox">
          <label for="he" class="input__checkbox--label label--him">he / him</label>
        </div>
        <div class="grid-she">
          <input id="she" name="she" class="input__checkbox label--she" type="checkbox">
          <label for="she" class="input__checkbox--label label--her">she / her</label>
        </div>
        <div class="grid-they">
          <input id="they" name="they" class="input__checkbox label--they" type="checkbox">
          <label for="they" class="input__checkbox--label label--them">they / them</label>
        </div>
        <div class="grid-it">
          <input id="it" name="it" class="input__checkbox label--it" type="checkbox">
          <label for="it" class="input__checkbox--label label--its">it / its</label>
        </div>
        <div class="grid-other">
          <input id="other" name="other" class="input__checkbox" type="checkbox">
          <label for="other" class="input__checkbox--label">other:</label>
        </div>
        <input id="other-pronouns" class="form--text" type="text">
      </div>
    </form>
  `
}
function getPEFooterHTML() {
  return `
    <button id="btn-add-person" class="btn" type="submit">Add person</button>
    <button id="btn-show-list" class="btn">Show list</button>
  `
}