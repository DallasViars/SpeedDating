import { renderParticipantEntryHTML } from "./components/02ParticipantEntry.js";
import { renderParticipantsListHTML } from "./components/03ParticipantList.js";
import { renderEnterMatchesHTML } from "./components/04ParticipantMatches.js";
import { renderMatchesListHTML } from "./components/05MatchList.js";
import { renderLetterHTML } from "./components/06Letter.js";
import * as utils from "./components/utils.js";

const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

export { header, main, footer, participantsList, recentId }

//Delete below for production
const participantsList = [
  {
    "id": 1,
    "name": "Dallas Viars",
    "email": "viarsdj@gmail.com",
    "location": "Midlothian, VA",
    "discord": "dallasviars",
    "facebook": "Dallas Viars",
    "pronouns": [
      [
        true,
        "He/him"
      ],
      [
        false,
        "She/her"
      ],
      [
        false,
        "They/them"
      ],
      [
        false,
        "It/its"
      ],
      [
        false,
        ""
      ]
    ],
    "friends": {},
    "romance": {},
    "matches": {
      "friends": {},
      "romance": {}
    },
    "hasBeenSaved": false,
    "hasBeenProcessed": false,
  },
  {
    "id": 2,
    "name": "IHaveALong LastNameReallyLong",
    "email": "no@emailaddress.com",
    "location": "Midlothian, VA",
    "discord": "reallyreallylong",
    "facebook": "",
    "pronouns": [
      [
        false,
        "He/him"
      ],
      [
        true,
        "She/her"
      ],
      [
        false,
        "They/them"
      ],
      [
        false,
        "It/its"
      ],
      [
        false,
        ""
      ]
    ],
    "friends": {},
    "romance": {},
    "matches": {
      "friends": {},
      "romance": {}
    },
    "hasBeenSaved": false,
    "hasBeenProcessed": false,
  },  
  {
    "id": 3,
    "name": "James Spader",
    "email": "iwish@emailaddress.com",
    "location": "",
    "discord": "therealjamesspader",
    "facebook": "JamesSpader",
    "pronouns": [
      [
        true,
        "He/him"
      ],
      [
        false,
        "She/her"
      ],
      [
        true,
        "They/them"
      ],
      [
        false,
        "It/its"
      ],
      [
        false,
        ""
      ]
    ],
    "friends": {},
    "romance": {},
    "matches": {
      "friends": {},
      "romance": {}
    },
    "hasBeenSaved": false,
    "hasBeenProcessed": false,
  },
  {
    "id": 4,
    "name": "Elizabeth LastName",
    "email": "LastLiz@emailaddress.com",
    "location": "",
    "discord": "thelastliz",
    "facebook": "thelastliz",
    "pronouns": [
      [
        false,
        "He/him"
      ],
      [
        true,
        "She/her"
      ],
      [
        false,
        "They/them"
      ],
      [
        true,
        "It/its"
      ],
      [
        false,
        ""
      ]
    ],
    "friends": {},
    "romance": {},
    "matches": {
      "friends": {},
      "romance": {}
    },
    "hasBeenSaved": false,
    "hasBeenProcessed": false,
  },
  {
    "id": 5,
    "name": "Person5",
    "email": "person5@emailaddress.com",
    "location": "",
    "discord": "person5",
    "facebook": "person5",
    "pronouns": [
      [
        false,
        "He/him"
      ],
      [
        true,
        "She/her"
      ],
      [
        true,
        "They/them"
      ],
      [
        true,
        "It/its"
      ],
      [
        false,
        ""
      ]
    ],
    "friends": {},
    "romance": {},
    "matches": {
      "friends": {},
      "romance": {}
    },
    "hasBeenSaved": false,
    "hasBeenProcessed": false,
  },
  {
  "id": 6,
  "name": "Another person",
  "email": "anotherperson@emailaddress.com",
  "location": "Virginia",
  "discord": "anotherperson",
  "facebook": "anotherperson",
  "pronouns": [
    [
      false,
      "He/him"
    ],
    [
      false,
      "She/her"
    ],
    [
      false,
      "They/them"
    ],
    [
      false,
      "It/its"
    ],
    [
      true,
      "Robot"
    ]
  ],
  "friends": {},
  "romance": {},
  "matches": {
    "friends": {},
    "romance": {}
  },
  "hasBeenSaved": false,
  "hasBeenProcessed": false
}
];

//Uncomment below for production
// const participantsList = [];
let recentId = 0;

document.body.addEventListener("click", clickHandler);
document.body.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { clickHandler(e) }
});

function clickHandler(e) {
  switch(e.target.id) {
    case "btn-add-person":
      utils.addPerson();
      document.querySelector("#name").focus();
      break;
    case "btn-show-list":
      renderParticipantsListHTML();
      break;
    case "back-to-add-person":
      renderParticipantEntryHTML();
      break;
    case "btn-enter-matches":
      renderEnterMatchesHTML(1);
      break;
    case "btn-save-matches":
      const userId = Number(e.target.dataset.userId);
      const participantsLength = participantsList.length;
      const nextParticipantId = userId >= participantsLength ? 1 : userId + 1;
      utils.saveMatches(userId); 
      renderEnterMatchesHTML(nextParticipantId);
      break;
    case "btn-get-matches-list":
      renderMatchesListHTML()
      break;
  }
  if (e.target.dataset.id) { renderEnterMatchesHTML(e.target.dataset.id) };
  if (e.target.dataset.listId) { renderLetterHTML(e.target.dataset.listId) };
  if (e.target.dataset.letterId) { renderLetterHTML(e.target.dataset.letterId) };
}

// function checkForDuplicate(name) {
//   return participantsList.some(participant => participant.name === name);
// }

// function addPerson() {
//   const userInputs = Array.from(document.querySelectorAll(".form--text"));
//   const pronounInputs = Array.from(document.querySelectorAll(".input__checkbox"));
//   const [name, discord, email, facebook, location] = userInputs;
//   const [he, she, they, it, other] = pronounInputs;
//   const otherPronouns = document.querySelector("#other-pronouns").value;
//   if (!name.value) return;
//   if (checkForDuplicate(name.value)) { 
//     // Display error message saying name already exists
//     return
//   }
//   //How can I make this a class?
//   //Can I use formData for this?
//   const person = {
//     id: (participantsList.length ? participantsList.length : 0),
//     name: name.value,
//     email: email.value, 
//     location: location.value,
//     discord: discord.value,
//     facebook: facebook.value,
//     pronouns: [
//       [ he.checked, "He/him" ],
//       [ she.checked, "She/her" ],
//       [ they.checked, "They/them" ],
//       [ it.checked, "It/its" ],
//       [ otherPronouns && other.checked, otherPronouns ]
//     ],
//     friends: {},
//     romance: {},
//     matches: {
//       friends: {},
//       romance: {}
//     },
//     hasBeenSaved: false,
//     hasBeenProcessed: false,
//   }
//   participantsList.push(person);
//   clearForm(userInputs, pronounInputs);
// }

// function clearForm(userInputs, pronounInputs) {
//   for (let input of userInputs) { input.value = "" }
//   for (let input of pronounInputs) { input.checked = false }
// }

/* Section 2: Enter Participant Data */
// function renderParticipantEntryHTML() {
//   header.innerHTML = getPEHeaderHTML();
//   main.innerHTML = getPEMainHTML();
//   footer.innerHTML = getPEFooterHTML();
// }
// function getPEHeaderHTML() {
//   return `
//     <h2>Please enter participant information below</h2>
//   `
// }
// function getPEMainHTML() {
//   return `
//     <form class="form">
//       <div class="input__container">
//         <label for="name" class="form__label">name:</label>
//         <input id="name" name="name" class="form--text" type="text" required>
//       </div>
//       <div class="input__container">
//         <label for="discord" class="form__label">discord:</label>
//         <input id="discord" name="discord" class="form--text" type="text">
//       </div>
//       <div class="input__container">
//         <label for="email" class="form__label">email:</label>
//         <input id="email" name="email" class="form--text" type="text" required>
//       </div>
//       <div class="input__container">
//         <label for="facebook" class="form__label">facebook:</label>
//         <input id="facebook" name="facebook" class="form--text" type="text">
//       </div>
//       <div class="input__container">
//         <label for="location" class="form__label">location:</label>
//         <input id="location" name="location" class="form--text" type="text">
//       </div>
//       <div class="input__checkbox--container">
//         <p class="placeholder">Pronouns:</p>
//         <div class="grid-he">
//           <input id="he" name="he" class="input__checkbox label--he" type="checkbox">
//           <label for="he" class="input__checkbox--label label--him">he / him</label>
//         </div>
//         <div class="grid-she">
//           <input id="she" name="she" class="input__checkbox label--she" type="checkbox">
//           <label for="she" class="input__checkbox--label label--her">she / her</label>
//         </div>
//         <div class="grid-they">
//           <input id="they" name="they" class="input__checkbox label--they" type="checkbox">
//           <label for="they" class="input__checkbox--label label--them">they / them</label>
//         </div>
//         <div class="grid-it">
//           <input id="it" name="it" class="input__checkbox label--it" type="checkbox">
//           <label for="it" class="input__checkbox--label label--its">it / its</label>
//         </div>
//         <div class="grid-other">
//           <input id="other" name="other" class="input__checkbox" type="checkbox">
//           <label for="other" class="input__checkbox--label">other:</label>
//         </div>
//         <input id="other-pronouns" class="form--text" type="text">
//       </div>
//     </form>
//   `
// }
// function getPEFooterHTML() {
//   return `
//     <button id="btn-add-person" class="btn" type="submit">Add person</button>
//     <button id="btn-show-list" class="btn">Show list</button>
//   `
// }

/* Section 3: View Participant List */
// function renderParticipantsListHTML() {
//   header.innerHTML = getPLHeaderHTML();
//   main.innerHTML = getPLMainHTML();
//   footer.innerHTML = getPLFooterHTML();
// }
// function getPLHeaderHTML() {
//   return `<h2>Click on a name to begin</h2>`;
// }
// function getPLMainHTML() {
//   let html = `
//     <div class="main__container">
//       <ul>
//   `
//   if (Object.keys(participantsList)) {
//     for (let participant in participantsList) {
//       const { id, name } = participantsList[participant];
//       html += `<li class="main__list--item" data-id=${id} tabindex="0">${name}</li>`
//     }
//   }
//   html += `</ul></div>`
//   return html;
// }
// function getPLFooterHTML() {
//   return `<button id="back-to-add-person" class="btn btn--wide">Back to add person</button>`
// }

/* Section 4: Enter Participant's Matches */
// function renderEnterMatchesHTML(id) {
//   header.innerHTML = getEMHeaderHTML(id);
//   main.innerHTML = getEMMainHTML(id);
//   footer.innerHTML = getEMFooterHTML(id);
//   recentId = id;
// }
// function getEMHeaderHTML(id) {
//   id = Number(id);
//   const participantInfo = participantsList.filter(participant => Number(participant.id) === id);
//   let { name, hasBeenSaved } = participantInfo[0];
//   return `
//     <p class="wide100 ${hasBeenSaved ? "checked" : ""}" ${hasBeenSaved ? "title='" + name + " has already been saved'" : ""}>${name}</p>
//     <button id="btn-prev" data-id=${id === 0 ? participantsList.length - 1 : id - 1} class="btn">Previous</button>
//     <button id="btn-next" data-id=${id === participantsList.length - 1 ? 0 : id + 1} class="btn">Next</button>
//   `
// }
// function getEMMainHTML(mainId) {
//   mainId = Number(mainId);
//   const mainParticipant = participantsList.filter(participant => Number(participant.id) === mainId);
//   let html = `<div class="main__container flex col gap1">`
//   html += participantsList.map(participant => {
//     if (Number(mainId) === Number(participant.id)) { return }
//     const { id, name } = participant;
//     const isFriend = Boolean(mainParticipant[0].friends[id])
//     const isRomance = Boolean(mainParticipant[0].romance[id])
//     return `
//       <div class="match__info">
//         <p class="match__name wide100">${name}</p>
//         <input id="friend-${id}" data-friend-id=${id} class="match__info--input-label" type="checkbox" ${isFriend ? "checked" : ""}>
//         <label for="friend-${id}" class="match__info--input-label">Friend</label>

//         <input id="romance-${id}" data-romance-id=${id} class="match__info--input-label" type="checkbox" ${isRomance ? "checked" : ""}>
//         <label for="romance-${id}" class="match__info--input-label">Romance</label>
//       </div>
//     `
//   }).join("");
//   html += `
//       <button id="btn-save-matches" data-user-id=${mainId} class="btn">Save Matches</button>
//     </div>
//   `
//   return html;
// }
// function getEMFooterHTML() {
//   return `
//     <button id="btn-show-list" class="btn">Back</button>
//     <button id="btn-get-matches-list" class="btn">Matches List</button>
//   `
// }

/* Section 5: View Participant List After Matches */
// function renderMatchesListHTML() {
//   header.innerHTML = getMLHeaderHTML();
//   main.innerHTML = getMLMainHTML();
//   footer.innerHTML = getMLFooterHTML();
// }
// function getMLHeaderHTML() {
//   return `<h2>Click on a name to generate their matches letter</h2>`
// }
// function getMLMainHTML() {
//   let html = `
//     <div class="main__container">
//       <ul>
//   `
//   html += participantsList.map(participant => {
//     const { id, name, hasBeenProcessed } = participant;
//     return `
//       <li 
//         data-list-id="${id}" 
//         class="main__list--item ${hasBeenProcessed ? "checked" : ""}"
//         ${hasBeenProcessed ? "title='This participant has already been processed'" : ""}
//         >
//         ${name}
//       </li>
//     `
//   }).join("");
//   html += `
//       </ul>
//     </div>
//   `
//   return html;
// }
// function getMLFooterHTML() {
//   return `<button id="btn-enter-matches" class="btn btn--wide">Back to Enter matches</button>`
// }

/* Section 6: View Participant Matches Letter */
//Incomplete
// function renderLetterHTML(id) {
//   header.innerHTML = getLetterHeaderHTML(id);
//   main.innerHTML = getLetterMainHTML(id);
//   footer.innerHTML = getLetterFooterHTML(id);
//   insertEmailLink(id);
// }
// function getLetterHeaderHTML(id) {
//   id = Number(id);
//   const participantInfo = participantsList.filter(participant => Number(participant.id) === id)[0];
//   let { name, email, pronouns, hasBeenProcessed } = participantInfo;
//   pronouns = pronouns.filter(item => item[0] ? item[1] : "").map(item => item[1]).join(", ") || "None given";
//   return `
//     <div class="wide100">
//       <p ${hasBeenProcessed ? "class='checked'" : ""}>${name} <span>(${pronouns})</span></p>
//       <p>${email}</p>
//     </div>
//   `
// }
// function getLetterMainHTML(id) {
//   let mainParticipant = participantsList.filter(item => Number(item.id) === Number(id))[0]
//   const { friends, romance } = processMatches(id);
//   let html = `
//     <div class="main__letter">
//       <p>Dear ${mainParticipant.name},</p>
//       <p>Thank you for attending our event on October 1, 2023, we hope you had a wonderful time. We've taken the time to match each person with the people who also matched with them.</p>
//       <p>For example: If you indicated you were interested in a friendship with Alex, and Alex indicated they were interested in friendship with you, you two would be matched together and would show on this list.</p>
//   `
//   if (!Object.keys(friends).length && !Object.keys(romance).length) {
//     html += `
//       <p>We regret that during this event your desired connections did not choose to match with you.</p>
//     `
//   }
//   if (Object.keys(friends).length > 0) {
//     html += `
//       <p>Your Friendship matches are:</p>
//       <ul>
//     `
//     for (let friend in friends) {
//       friend = Number(friend)
//       let participant = participantsList.filter(item => Number(item.id) === friend)[0]
//       let { id, name, email, discord, facebook, pronouns } = participant;
//       pronouns = pronouns.filter(item => item[0] ? item[1] : "").map(item => item[1]).join(", ") || "None given";
//       html += `
//         <li>${name} (${pronouns || "Not given"})
//           <ul>
//             <li>Email: ${email || "Not given"} </li>
//             <li>Discord: ${discord || "Not given"} </li>
//             <li>Facebook: ${facebook || "Not given"} </li>
//           </ul>
//         </li><br>
//       `
//     }
//     html += `</ul>`
//   }
//   if (Object.keys(romance).length > 0) {
//     html += `
//       <p>Your Romantic matches are:</p>
//       <ul>
//     `
//     for (let rom in romance) {
//       rom = Number(rom)
//       let participant = participantsList.filter(item => Number(item.id) === rom)[0]
//       let { id, name, email, discord, facebook, pronouns } = participant;
//       pronouns = pronouns.filter(item => item[0] ? item[1] : "").map(item => item[1]).join(", ") || "None given";
//       html += `
//         <li>${name} (${pronouns || "Not given"})
//           <ul>
//             <li>Email: ${email || "Not given"} </li>
//             <li>Discord: ${discord || "Not given"} </li>
//             <li>Facebook: ${facebook || "Not given"} </li>
//           </ul>
//         </li><br>
//       `
//     }
//     html += `</ul>`
//   }
//   html += `
//       <p>We wish you the best of luck in making new connections and look forward to seeing you at future events.</p>
//       <p>Sincerely,</p>
//       <p>The Team</p>
//     </div>  
//   `
//   // const emailLink = `<a class="btn btn--wide" class="send-email" href="mailto:${mainParticipant.email}?Subject=Your Speed Dating Results&body=${convertLetterToEmail(html)}">Email this to the user</a>`
//   return html;
// }
// function getLetterFooterHTML(id) {
//   id = Number(id);
//   return `
//     <button id="btn-prev" data-letter-id=${id === 0 ? participantsList.length - 1 : id - 1} class="btn">Previous</button>
//     <button id="btn-next" data-letter-id=${id === participantsList.length - 1 ? 0 : id + 1} class="btn">Next</button>
//   `
// }

// //This can be DRYer
// function saveMatches(id) {
//   id = Number(id);
//   const participant = participantsList.filter(item => Number(item.id) === id)[0];
//   const friends = document.querySelectorAll("[data-friend-id]");
//   const romance = document.querySelectorAll("[data-romance-id]");
//   friends.forEach(friend => {
//     const friendId = Number(friend.dataset.friendId);
//     const friendName = participantsList.filter(item => friendId === Number(item.id))[0].name
//     if (friend.checked) {
//       participant.friends[friendId] = { id: friendId, name: friendName }
//     } else {
//       if (participant.friends[friendId]) {
//         delete participant.friends[friendId]
//       }
//     }
//   })
//   romance.forEach(romance => {
//     const romanceId = Number(romance.dataset.romanceId);
//     const romanceName = participantsList.filter(item => romanceId === Number(item.id))[0].name
//     if (romance.checked) {
//       participant.romance[romanceId] = { id: romanceId, name: romanceName }
//     } else {
//       if (participant.romance[romanceId]) {
//         delete participant.romance[romanceId]
//       }
//     }

//   })
//   participant.hasBeenSaved = true;
// }

// //This can be DRYer
// function processMatches(id) {
//   id = Number(id);
//   const participant = participantsList.filter(user => Number(user.id) === id)
//   const { friends, romance } = participant[0];
//   for (let i in friends) {
//     let friend = participantsList.filter(item => Number(item.id) === Number(i))[0];
//     if (friend.friends[id]) { 
//       participant[0].matches.friends[i] = {id: friend.id, name: friend.name }
//     }
//   }
//   for (let i in romance) {
//     let rom = participantsList.filter(item => Number(item.id) === Number(i))[0];
//     if (rom.friends[id]) { 
//       participant[0].matches.romance[i] = {id: rom.id, name: rom.name }
//     }
//   }
//   participant[0].hasBeenProcessed = true;
//   return participant[0].matches;
// }

// //This copies the email to send and creates a mailto link that opens in the user's email client, but still needs formatting
// function insertEmailLink(id) {
//   id = Number(id);
//   const participant = participantsList.filter(item => id === Number(item.id))[0]
//   const emailEl = document.createElement("a");
//   const letterEl = document.querySelector(".main__letter")
//   const regex = /<\w+>?|<\/\w+>?/gi
//   const letterText = letterEl.textContent.trim().replace(regex, "").replace(/\n\n/gi, "")
//   // navigator.clipboard.writeText(letterText);
//   emailEl.classList = "btn btn--wide send-email";
//   emailEl.setAttribute("href", `mailto:${participant.email}?Subject=Your Speed Dating Results&body=${letterText}`);
//   emailEl.textContent = "Send this as an email";
//   letterEl.append(emailEl);
// }

renderParticipantEntryHTML();