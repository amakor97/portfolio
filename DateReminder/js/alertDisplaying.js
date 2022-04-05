/* alert displaying */

const alertBox = document.querySelector(".date-alert");
const alertText = document.querySelector(".date-alert__text");

export function displayAlert(days) {
  if (days === 0) {
    alertText.textContent = "The next date is today!";
  } else if (days === -1) {
    alertText.textContent = "There are no dates";
  } else {
    alertText.textContent = `Before next date: ${days}`;
  }
}