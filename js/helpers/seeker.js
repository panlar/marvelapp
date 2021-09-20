import { db_characters } from "../index.js";
import { resultCard } from "./cards.js";
import { d, seeker } from "./consts.js";

export default function printResults() {
  if (!seeker.$seeker_input.value) {
    seeker.$seeker_alert.classList.add("active");
    setTimeout(() => {
      seeker.$seeker_alert.classList.remove("active");
    }, 1500);
    return;
  }

  if (window.innerWidth < 768) {
    seeker.$seeker_input.blur();
  }

  seeker.$seeker_bottom.innerHTML = "";
  seeker.$seeker_bottom.scrollTop = 0;

  const $results_container = d.createElement("div");
  $results_container.className = "results-container";
  let matches = findMatches();

  if (!matches.length) {
    $results_container.innerHTML = `
    <div class="card-notfound">
      <ion-icon name="close-circle-outline"></ion-icon>
      <span>That character doesn't exist</span>
    </div>
    `;
    seeker.$seeker_bottom.appendChild($results_container);
    return;
  }

  matches.forEach((match, index) => {
    const options = {
      id: match.id,
      title: match.name,
      img: match.img,
      url: match.resourceURI,
      index,
      section: "CHARACTERS",
    };
    $results_container.innerHTML += resultCard(options);
  });

  seeker.$seeker_bottom.appendChild($results_container);

  lazyLoading(".results-container img", "src");
}

function findMatches() {
  let value = seeker.$seeker_input.value.toLowerCase().trim();
  return db_characters.filter((el) => {
    return value === el.name.toLowerCase().substring(0, value.length);
  });
}
