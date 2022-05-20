"use strict";

export function createCatalogCard(productData, positionFlag) {
  let card = document.createElement("a");
  card.classList.add("catalog-card", "catalog-carousel__card");
  card.href = positionFlag ? `.${productData.href.slice(11)}` : productData.href;

  let img = createImg(productData, positionFlag);
  card.appendChild(img);

  let description = createDescription(productData);
  card.appendChild(description);

  return card;
}

function createImg(productData, positionFlag) {
  let img = document.createElement("img");
  img.src = positionFlag ? `./.${productData.src}` : productData.src;
  img.classList.add("catalog-card__img");
  img.alt = productData.alt;
  return img;
}

function createDescription(productData) {
  let cont = document.createElement("div");
  cont.classList.add("catalog-card__description");

  let name = document.createElement("p");
  name.classList.add("catalog-card__text", 
  "catalog-card__text--title", "catalog-card__text--first-lined");
  name.textContent = productData.name;
  cont.appendChild(name);

  let cost = document.createElement("p");
  cost.classList.add("catalog-card__text",
  "catalog-card__text--first-lined", "catalog-card__text--righted");
  cost.textContent = productData.cost + "₽";
  cont.appendChild(cost);

  let type = document.createElement("p");
  type.classList.add("catalog-card__text",
  "catalog-card__text--second-lined");
  type.textContent = productData.type;
  cont.appendChild(type);

  let volume = document.createElement("p");
  volume.classList.add("catalog-card__text", "catalog-card__text--second-lined", "catalog-card__text--righted");
  volume.textContent = productData.volume;
  cont.appendChild(volume);

  return cont;
}