export const d = document;
export const ls = localStorage;

const HASH =
    "?ts=1&apikey=b506b9dc72ecad9187035d9cfafbece9&hash=d13b60fcd96542d1e68834d7ef268ca2",
  API = `https://gateway.marvel.com/v1/public`,
  CHARACTERS = `${API}/characters${HASH}`,
  COMICS = `${API}/comics${HASH}`,
  SERIES = `${API}/series${HASH}`,
  DB_CHARACTERS =
    "https://cdn.jsdelivr.net/gh/panlar/apiDB/marvel-characters-min.json",
  $header_button_menu = d.getElementById("header-button-menu"),
  $header_button_seeker = d.getElementById("header-button-seeker"),
  $menu = d.getElementById("menu"),
  $menu_button_back = d.getElementById("menu-button-back"),
  $menu_items = d.querySelectorAll(".menu-item"),
  $app = d.getElementById("app"),
  $app_loader = d.getElementById("app-loader"),
  $app_button_top = d.getElementById("app-button-top"),
  $seeker = d.getElementById("seeker"),
  $seeker_top = d.getElementById("seeker-top"),
  $seeker_input = d.getElementById("seeker-input"),
  $seeker_button_eraser = d.getElementById("seeker-button-eraser"),
  $seeker_button_search = d.getElementById("seeker-button-search"),
  $seeker_alert = d.getElementById("seeker-alert"),
  $seeker_bottom = d.getElementById("seeker-bottom");

export const api = {
  HASH,
  API,
  CHARACTERS,
  COMICS,
  SERIES,
  DB_CHARACTERS,
};
export const header = {
  $header_button_menu,
  $header_button_seeker,
};
export const menu = {
  $menu,
  $menu_button_back,
  $menu_items,
};
export const app = {
  $app,
  $app_loader,
  $app_button_top,
};
export const seeker = {
  $seeker,
  $seeker_top,
  $seeker_button_eraser,
  $seeker_button_search,
  $seeker_input,
  $seeker_alert,
  $seeker_bottom,
};
