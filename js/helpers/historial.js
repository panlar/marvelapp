import { historyCard } from "./cards.js";
import { d, ls, seeker } from "./consts.js";

export function printHistory() {
  const history = [...JSON.parse(ls.getItem("history"))],
    $history_container = d.createElement("div");
  $history_container.className = "history-container";
  seeker.$seeker_bottom.innerHTML = "";

  if (!history.length) {
    return;
  }

  seeker.$seeker_bottom.innerHTML = `
  <header class="history-header">Recent</header>
  `;
  seeker.$seeker_bottom.scrollTop = 0;

  history.forEach((item, index) => {
    const options = {
      id: item.id,
      title: item.title,
      img: item.img,
      url: item.url,
      index,
      section: item.section,
    };

    $history_container.innerHTML += historyCard(options);
  });

  seeker.$seeker_bottom.appendChild($history_container);

  seeker.$seeker_bottom.innerHTML += `
  <footer class="history-footer">Clear search history</footer>
  `;

  lazyLoading(".history-container img", "src");
  d.querySelector(".history-footer").addEventListener("click", deleteHistory);
}

export function updateHistory(card) {
  const history = [...JSON.parse(ls.getItem("history"))];
  const obj = {
    id: card.dataset.id,
    title: card.querySelector("img").alt,
    img: card.querySelector("img").dataset.src,
    url: card.dataset.url,
    section: card.dataset.section,
  };

  if (history.some((item) => item.id === obj.id)) return;

  history.unshift(obj);

  ls.setItem("history", JSON.stringify(history));
}

export function deleteItemHistory(card) {
  let history = [...JSON.parse(ls.getItem("history"))];
  history = history.filter((item) => item.id !== card.dataset.id);
  ls.setItem("history", JSON.stringify(history));
  card.remove();
  if (!history.length) seeker.$seeker_bottom.innerHTML = "";
}

function deleteHistory() {
  if (confirm("You want to delete the history?")) {
    ls.setItem("history", "[]");
    printHistory();
  }
}
