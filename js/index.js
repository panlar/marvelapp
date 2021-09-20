import { d, ls, api, menu, header, app, seeker } from "./helpers/consts.js";
import getData from "./helpers/fetch.js";
import printResults from "./helpers/seeker.js";
import {
  deleteItemHistory,
  printHistory,
  updateHistory,
} from "./helpers/historial.js";
import { functionsApp, printCards } from "./helpers/app.js";

let offset = 0,
  history = [],
  section = "CHARACTERS";
export let db_characters = [];

if (ls.getItem("history") === null) {
  ls.setItem("history", JSON.stringify(history));
}

(async () => {
  let json_db = await getData(api.DB_CHARACTERS);
  db_characters = [...json_db.characters];
})();

d.addEventListener("click", async (e) => {
  if (
    e.target.matches(`.card *`) &&
    !e.target.matches(".card-delete") &&
    !e.target.matches(".card-delete *")
  ) {
    let card = e.target.closest(".card");
    updateHistory(card);
    seeker.$seeker.classList.remove("active");
    header.$header_button_seeker.lastElementChild.name = "search-outline";
  }

  if (e.target.matches(".card-delete") || e.target.matches(".card-delete *")) {
    const card = e.target.closest(".card");
    deleteItemHistory(card);
  }

  if (
    e.target.matches(".card *") &&
    !e.target.matches(".card-delete") &&
    !e.target.matches(".card-delete *")
  ) {
    let card = e.target.closest(".card"),
      resourceURI = `${card.dataset.url}${api.HASH}`;
    section = card.dataset.section;
    functionsApp[section](resourceURI);
  }
});

d.addEventListener("DOMContentLoaded", async (e) => {
  printCards(`${api.CHARACTERS}&offset=${offset}`, section);
});

header.$header_button_menu.addEventListener("click", (e) => {
  menu.$menu.classList.add("active");
  seeker.$seeker.classList.remove("active");
  header.$header_button_seeker.lastElementChild.name = "search-outline";
});

header.$header_button_seeker.addEventListener("click", (e) => {
  menu.$menu.classList.remove("active");
  seeker.$seeker.classList.toggle("active");
  if (seeker.$seeker.classList.contains("active")) {
    seeker.$seeker_input.focus();
    header.$header_button_seeker.lastElementChild.name = "close-outline";
  } else {
    seeker.$seeker_input.blur();
    header.$header_button_seeker.lastElementChild.name = "search-outline";
  }
});

menu.$menu_button_back.addEventListener("click", (e) => {
  menu.$menu.classList.remove("active");
});

menu.$menu_items.forEach((item) => {
  item.addEventListener("click", (e) => {
    section = e.target.dataset.item;
    const menuItemActive = d.querySelector(".menu-item.active"),
      menuItemSelected = d.querySelector(`.menu-item[data-item="${section}"]`);
    menuItemActive.classList.remove("active");
    menuItemSelected.classList.add("active");
    menu.$menu.classList.remove("active");
    printCards(`${api[section]}&offset=${offset}`, section);
  });
});

app.$app_button_top.addEventListener("click", (e) => {
  app.$app.scrollTop = 0;
});

app.$app.addEventListener("scroll", e => {
  app.$app_button_top.classList.toggle("active", e.target.scrollTop > 20);
})

seeker.$seeker_input.addEventListener("focus", (e) => {
  seeker.$seeker_top.classList.add("active");
  if (
    !d.querySelector(".results-container") &&
    !d.querySelector(".history-container")
  ) {
    printHistory();
  }
});

seeker.$seeker_input.addEventListener("blur", (e) => {
  seeker.$seeker_top.classList.remove("active");
});

seeker.$seeker_input.addEventListener("keyup", (e) => {
  if (seeker.$seeker_input.value) {
    seeker.$seeker_button_eraser.classList.add("active");
  } else {
    seeker.$seeker_button_eraser.classList.remove("active");
  }

  if (e.key === "Enter") {
    printResults();
  }
});

seeker.$seeker_button_eraser.addEventListener("click", (e) => {
  seeker.$seeker_input.value = "";
  seeker.$seeker_button_eraser.classList.remove("active");
  printHistory();
});

seeker.$seeker_button_search.addEventListener("click", (e) => {
  seeker.$seeker_input.focus();
  printResults();
});
