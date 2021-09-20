import { ls } from "./consts.js";

export default async function getData(url) {
  if (ls.getItem("fetch") === null) {
    ls.setItem("fetch", "0");
  }

  let res = await fetch(url),
    json = await res.json();

  if (!(url.includes("jsdelivr"))) {
    ls.setItem("fetch", JSON.parse(ls.getItem("fetch")) + 1);
  }

  return json;
}
