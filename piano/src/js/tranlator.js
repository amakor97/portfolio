"use strict";

export function setLang(lang) {
  const html = document.getElementsByTagName("html")[0];
  html.lang = lang;
  replaceTexts();
}


async function replaceTexts() {
  const html = document.getElementsByTagName("html")[0];
  const textElems = document.querySelectorAll("[data-text]");
  const translatableTexts = document.querySelectorAll("[data-text");

  if (html.lang === "en") {
    fetch("./src/texts/en.json")
    .then(res => res.json())
    .then(jsonObj => {
      translatableTexts.forEach(textElem => {
        const key = textElem.dataset.text;
        if (jsonObj[key]) {
          textElem.textContent = jsonObj[key];
        }
      })
    });
  }
  if (html.lang === "ru") {
    fetch("./src/texts/ru.json")
    .then(res => res.json())
    .then(jsonObj => {
      translatableTexts.forEach(textElem => {
        const key = textElem.dataset.text;
        if (jsonObj[key]) {
          textElem.textContent = jsonObj[key];
        }
      })
    });
  }
}