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
    getDataFromReader(tmpDates);
  })

  if (file) {
    reader.readAsText(file);    
  }
}

