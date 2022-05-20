"use strict";

export function createBestsellersCard(productData) {
  let card = document.createElement("a");
  card.classList.add("intro-card", "intro-carousel__intro-card");
  card.setAttribute("href", productData.href);

  let img = createImg(productData);
  card.appendChild(img);

  let description = createDescription(productData);
  card.appendChild(description);

  return card;
}

function createImg(productData) {
  let img = document.createElement("img");
  img.src = productData.src;
  img.classList.add("intro-card__img");
  img.alt = productData.alt;
  return img;
}

function createDescription(productData) {
  let cont = document.createElement("div");
  cont.classList.add("intro-card__description");

  let name = document.createElement("p");
  name.classList.add("intro-card__name");
  name.textContent = productData.name;
  cont.appendChild(name);

  let type = document.createElement("p");
  type.classList.add("intro-card__type");
  type.textContent = productData.type;
  cont.appendChild(type);

  let link = document.createElement("p");
  link.classList.add("intro-card__fake-link");
  link.textContent = "Подробнее";
  cont.appendChild(link);

  return cont;
}