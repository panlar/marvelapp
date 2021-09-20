import { ls } from "./consts.js";

export default async function getData(url) {
  let res = await fetch(url.replace(/^https|http/gi, "https")),
    json = await res.json();
  return json;
}
