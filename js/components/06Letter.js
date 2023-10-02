import { header, main, footer, participantsList } from "../index.js";
import * as utils from "./utils.js";


export function renderLetterHTML(id) {
  header.innerHTML = getLetterHeaderHTML(id);
  main.innerHTML = getLetterMainHTML(id);
  footer.innerHTML = getLetterFooterHTML(id);
  insertEmailLink(id);
}
function getLetterHeaderHTML(id) {
  const participantInfo = utils.getParticipant(id)[0];
  let { name, email, pronouns, hasBeenProcessed } = participantInfo;
  pronouns = pronouns.filter(item => item[0] ? item[1] : "").map(item => item[1]).join(", ") || "None given";
  return `
    <div class="wide100 flex col gap025">
      <p ${hasBeenProcessed ? "class='checked'" : ""}>${name} <span>(${pronouns})</span></p>
      <p>${email}</p>
      <p>${id} / ${participantsList.length}</p>
    </div>
  `
}
function getLetterMainHTML(id) {
  const mainParticipant = utils.getParticipant(id)[0];
  if (!mainParticipant.hasBeenSaved) {
    return `
      <div class="main__letter">
        <p class="letter__error">This user's desired matches were not saved. Please go back to the Enter Matches screen to enter their matches.</p>
      </div>
    `
  }
  const { friends, romance } = utils.processMatches(id);
  let html = `
    <div class="main__letter">
      <p>Dear ${mainParticipant.name},</p>
      <p>Thank you for attending our event on October 1, 2023, we hope you had a wonderful time. We've taken the time to match each person with the people who also matched with them.</p>
      <p>For example: If you indicated you were interested in a friendship with Alex, and Alex indicated they were interested in friendship with you, you two would be matched together and would show on this list.</p>
  `
  if (!Object.keys(friends).length && !Object.keys(romance).length) {
    html += `<p>We regret that during this event your desired connections did not also match with you.</p>`
  }
  if (Object.keys(friends).length > 0) {
    html += `<p>Your Friendship matches are:</p>`
    html += utils.getMatchInfoHTML(friends);
  }
  if (Object.keys(romance).length > 0) {
    html += `<p>Your Romantic matches are:</p>`
    html += utils.getMatchInfoHTML(romance);
  }
  html += `
      <p>We wish you the best of luck in making new connections and look forward to seeing you at future events.</p>
      <p>Sincerely,</p>
      <p>The Team</p>
    </div>  
  `
  return html;
}

function getLetterFooterHTML(id) {
  id = Number(id);
  return `
    <button id="btn-prev" data-letter-id=${id === 1 ? participantsList.length : id - 1} class="btn">Previous</button>
    <button id="btn-next" data-letter-id=${id === participantsList.length ? 1 : id + 1} class="btn">Next</button>
  `
}

//This copies the email to send and creates a mailto link that opens in the user's email client, but still needs formatting
function insertEmailLink(id) {
  id = Number(id);
  const letterError = document.querySelector(".letter__error") ?? "";
  const letterEl = document.querySelector(".main__letter")
  const participant = participantsList.filter(item => id === Number(item.id))[0]
  const emailEl = document.createElement("a");
  const mailMeteorLink = document.createElement("a");
  if (!letterError) {
    emailEl.classList = "send-email";
    emailEl.setAttribute("href", `mailto:${participant.email}?Subject=Your Speed Dating Results`);
    emailEl.textContent = "Send this as an email";

    mailMeteorLink.setAttribute("href", `https://mailmeteor.com/html-to-text#sourceInput`);
    mailMeteorLink.setAttribute("target", "_blank");
    mailMeteorLink.classList = "l-r-padding1";
    mailMeteorLink.textContent = "Go to MailMeteor to convert HTML to text (maintains letter formatting)";
  }

  const backButton = document.createElement("button");
  backButton.setAttribute("id", "btn-enter-matches");
  backButton.classList = "btn btn--wide send-email";
  backButton.textContent = "Back to Enter Matches";

  letterEl.append(mailMeteorLink);
  letterEl.append(emailEl);
  letterEl.append(backButton);

  //Add this to mailMeteorLink after Snackbar is created
  // const letterText = letterEl.innerHTML;
  // navigator.clipboard.writeText(letterText);
}