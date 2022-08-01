const functions = [
  "Создание таймера;",
  "Возможность выбрать старт таймера в текущий момент или в точное время;",
  "Возможность выбрать окончание таймера по кол-ву секунд, единиц измерения времени или задать точное время;",
  "Возможность указать и менять точность расчёта оставшегося времени в процентах;",
  "Возможность ставить таймер на паузу (недоступно для варианта окончания по времени);",
  "Возможность удалять таймеры."
]

const features = [
  "Приложение корректно работает в случае переключения на другую вкладку или закрытия вкладки с таймером"
]

const technologies = [
  "localStorage.",
] 

export function createModalWindow(outerBgColor, innerW, innerH, innerBgColor) {
  let outer = createOuterModal(outerBgColor);
  document.body.appendChild(outer);

  let inner = createInnerModal(innerW, innerH, innerBgColor);
  outer.appendChild(inner);

  let content = createModalContent();
  inner.appendChild(content);

  let closeBtn = createCloseBtn();
  inner.appendChild(closeBtn);
}

function createOuterModal(bgColor) {
  if (bgColor === undefined) {
    bgColor = "rgba(0,0,0,0.5)";
  }
  
  let outerModal = document.createElement("div");
  
  outerModal.style.position = "fixed";
  outerModal.style.top = 0;
  outerModal.style.left = 0;

  outerModal.style.width = "100%";
  outerModal.style.height = "100%";
  
  outerModal.style.backgroundColor = bgColor;

  outerModal.classList.add("modal");

  outerModal.addEventListener("click", function() {
    document.body.removeChild(outerModal);
  })

  return outerModal;
}

function createInnerModal(w, h, bgColor) {
  if (w === undefined) {
    if (window.innerWidth >= 1366) {
      w = "60%";
    } else if (window.innerWidth >= 768) {
      w = "80%";
    } else {
      w = "90%";
    }

  }
  if (h === undefined) {
    h = "50%";
  }
  if (bgColor === undefined) {
    bgColor = "rgba(255,255,255,1)";
  }

  let innerModal = document.createElement("div");

  innerModal.style.position = "absolute";
  innerModal.style.top = "50%";
  innerModal.style.left = "50%";
  innerModal.style.transform = "translate(-50%, -50%)";

  innerModal.style.width = w;
  innerModal.style.minHeight = h;

  innerModal.style.backgroundColor = bgColor;

  innerModal.classList.add("modal__window");

  innerModal.addEventListener("click", function(e) {
    e.stopPropagation();
  })

  return innerModal;
}

function createModalContent() {
  let content = document.createElement("div");
  content.classList.add("modal__content");

  let h2 = document.createElement("h2");
  h2.classList.add("modal__header");
  h2.textContent = "Информация о приложении";
  content.appendChild(h2);

  let p = createHeader("Visual Timer - приложение, предназначенное для создания таймеров с расчётом оставшегося времени в процентах и визуализацией в виде круговой диаграммы. Функции приложения:");
  content.appendChild(p);
  let ul = createList(functions);
  content.appendChild(ul);

  p = createHeader("Особенности приложения:");
  content.appendChild(p);
  ul = createList(features);
  content.appendChild(ul);

  p = createHeader("При создании приложения использовались следующие технологии:");
  content.appendChild(p);
  ul = createList(technologies);
  content.appendChild(ul);

  return content;
}

function createHeader(text) {
  let p = document.createElement("p");
  p.classList.add("modal__text");
  p.textContent = text;
  return p;
}

function createList(arr) {
  let ul = document.createElement("ul");
  ul.classList.add("modal__list");
  arr.forEach(function(text) {
    ul.appendChild(createItem(text));
  })
  return ul;
}

function createItem(text) {
  let item = document.createElement("li");
  item.classList.add("modal__item");
  item.textContent = text;
  return item;
}

function createCloseBtn() {
  let closeBtn = document.createElement("button");
  closeBtn.classList.add("modal__close-btn");
  closeBtn.textContent = "Закрыть";

  closeBtn.addEventListener("click", function() {
    let outerModal = this.parentElement.parentElement;
    document.body.removeChild(outerModal);
  })
  return closeBtn;
}