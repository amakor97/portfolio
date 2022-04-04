/* alert displaying */

const alertBox = document.querySelector(".date-alert");
const alertText = document.querySelector(".date-alert__text");

export function displayAlert(days) {
  alertText.textContent = `Before next date: ${days}`;
}