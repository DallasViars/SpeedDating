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
    "name": "Cyrilla Nikki",
    "email": "cyrilla@email.com",
    "location": "Midlothian, VA",
    "discord": "cyrillanikki",
    "facebook": "Dallas Viars",
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
    "id": 2,
    "name": "Kourtney Cat Linzi",
    "email": "korycat@email.com",
    "location": "Richmond, VA",
    "discord": "korycat",
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
    "id": 3,
    "name": "Gallagher Gladwin",
    "email": "gallaglad@emailaddress.com",
    "location": "",
    "discord": "sirgallaglad",
    "facebook": "gallaghergladwin",
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
    "id": 4,
    "name": "Isaac Clarke",
    "email": "isaac.clarke@ishimura.cec.com",
    "location": "",
    "discord": "busyengineer",
    "facebook": "",
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
    "id": 5,
    "name": "David",
    "email": "david@weyland.com",
    "location": "",
    "discord": "",
    "facebook": "",
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
        true,
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
    "hasBeenProcessed": false,
  },
  {
  "id": 6,
  "name": "Ed",
  "email": "ed@bebop.com",
  "location": "Mars",
  "discord": "mushroomhunting",
  "facebook": "",
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

renderParticipantEntryHTML();