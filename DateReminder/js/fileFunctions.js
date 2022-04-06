import { meaningfullDaysData} from "./app.js"
import { getDataFromReader } from "./app.js";

export function download(str) {
  let supLink = document.createElement("a");
  supLink.href = window.URL.createObjectURL(new Blob([str], {type: "application/json"}));
  supLink.download = "dateReminderData.json";
  supLink.click();
}

let saveBtn = document.querySelector(".js-save-btn");
saveBtn.addEventListener("click", function() {
  download(JSON.stringify(meaningfullDaysData));
})


let inputBtn = document.querySelector(".js-load-file");
inputBtn.addEventListener("change", function() {
  upload();
})


export async function upload () {
  const [file] = document.querySelector(".js-load-file").files;
  const reader = new FileReader();
  let text = "";

  reader.addEventListener("load", () => {
    text = reader.result;
    let tmpDates = JSON.parse(text);
    let isCorrupted = checkObj(tmpDates);
    console.log("is corrupted?", isCorrupted);
    if (!isCorrupted) {
      getDataFromReader(tmpDates);
    }
  })

  if (file) {
    reader.readAsText(file);    
  }
}

function checkObj(obj) {
  let isCorrupted = false;
  console.log(obj);
  console.log(obj.length);
  for (let i = 0; i < obj.length; i++) {
    console.log(obj[i].day);
    if ((obj[i].day === "") || (+obj[i].day < 1) || (+obj[i].day > 31)) {
      console.log("day is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
    if ((obj[i].dayStringed === "") || (+obj[i].dayStringed < 0) || (+obj[i].dayStringed > 30) || (isNaN(+obj[i].dayStringed))) {
      console.log("dayStringed is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
    if ((obj[i].month === "") || (obj[i].month.length !== 3)) {
      console.log("month is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
    if ((typeof(obj[i].monthCode) !== "number") || (obj[i].monthCode < 0) || (obj[i].monthCode > 11)) {
      console.log("monthCode is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
    if ((obj[i].monthCodeStringed === "") || (+obj[i].monthCodeStringed < 1) || (+obj[i].monthCodeStringed > 12)) {
      console.log("monthCodeStringed is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
    if ((typeof(obj[i].daysCount) !== "number") || (obj[i].daysCount < 0) || (obj[i].daysCount > 366)) {
      console.log("daysCount is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
    if ((typeof(obj[i].daysToDate) !== "number") || (obj[i].daysToDate < -366) || (obj[i].daysToDate > 366)) {
      console.log("daysToDate is corrupted");
      isCorrupted = true;
      return isCorrupted;
    }
  }
}

