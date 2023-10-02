import { participantsList } from "../index.js";

export function getParticipant(id) {
  return participantsList.filter(participant => Number(participant.id) === Number(id));
}

export function saveMatches(id) {
  const participant = getParticipant(id)[0];
  const friends = document.querySelectorAll("[data-friend-id]");
  const romance = document.querySelectorAll("[data-romance-id]");
  checkMatchesToBeSaved(participant, "friends", "friendId", friends);
  checkMatchesToBeSaved(participant, "romance", "romanceId", romance);
  participant.hasBeenSaved = true;
}

function checkMatchesToBeSaved(participant, type, idType, array) {
  array.forEach(item => {
    const dataId = Number(item.dataset[idType]);
    const dataName = getParticipant(dataId)[0].name
    if (item.checked) {
      participant[type][dataId] = { id: dataId, name: dataName }
    } else {
      if (participant[type][dataId]) {
        delete participant[type][dataId]
      }
    }
  })
}

export function processMatches(id) {
  const participant = getParticipant(id);
  const { friends, romance } = participant[0];
  findMatches(id, participant, "friends", friends);
  findMatches(id, participant, "romance", romance);
  participant[0].hasBeenProcessed = true;
  return participant[0].matches;
}
function findMatches(id, participant, type, object) {
  for (let i in object) {
    let friend = getParticipant(i)[0];
    if (friend[type][id]) { 
      participant[0].matches[type][i] = {id: friend.id, name: friend.name }
    }
  }
}

export function checkForDuplicate(name) {
  return participantsList.some(participant => participant.name === name);
}

export function addPerson() {
  const userInputs = Array.from(document.querySelectorAll(".form--text"));
  const pronounInputs = Array.from(document.querySelectorAll(".input__checkbox"));
  const [name, discord, email, facebook, location] = userInputs;
  const [he, she, they, it, other] = pronounInputs;
  const otherPronouns = document.querySelector("#other-pronouns").value;
  if (!name.value) return;
  if (checkForDuplicate(name.value)) { 
    // Display error message saying name already exists
    return
  }
  //How can I make this a class?
  //Can I use formData for this?
  const person = {
    id: (participantsList.length ? participantsList.length + 1 : 1),
    name: name.value,
    email: email.value, 
    location: location.value,
    discord: discord.value,
    facebook: facebook.value,
    pronouns: [
      [ he.checked, "He/him" ],
      [ she.checked, "She/her" ],
      [ they.checked, "They/them" ],
      [ it.checked, "It/its" ],
      [ otherPronouns && other.checked, otherPronouns ]
    ],
    friends: {},
    romance: {},
    matches: {
      friends: {},
      romance: {}
    },
    hasBeenSaved: false,
    hasBeenProcessed: false,
  }
  participantsList.push(person);
  clearForm(userInputs, pronounInputs);
}

export function clearForm(userInputs, pronounInputs) {
  for (let input of userInputs) { input.value = "" }
  for (let input of pronounInputs) { input.checked = false }
}

export function getMatchInfoHTML(object) {
  let html = `<ul>`;
  for (let obj in object) {
    let participant = getParticipant(obj)[0];
    let { name, email, discord, facebook, pronouns } = participant;
    pronouns = pronouns.filter(item => item[0] ? item[1] : "").map(item => item[1]).join(", ") || "None given";
    html += `
      <li>${name} (${pronouns || "Not given"})
        <ul>
          <li>Email: ${email || "Not given"} </li>
          <li>Discord: ${discord || "Not given"} </li>
          <li>Facebook: ${facebook || "Not given"} </li>
        </ul>
      </li><br>
    `
  }
  return html + `</ul>`;
}

//Still needs to be created
//To be displayed after creating a participant,
//after saving their matches, and copying their letter
function displaySnackbar() {

}