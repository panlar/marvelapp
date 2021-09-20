import { appCard } from "./cards.js";
import { d, app, menu, seeker, api } from "./consts.js";
import getData from "./fetch.js";
import { printHistory } from "./historial.js";

export async function printCards(url, section) {
  app.$app_loader.classList.add("active");
  app.$app.innerHTML = "";
  app.$app.scrollTop = 0;
  let data = await getData(url);

  const results = [...data.data.results],
    $cards_container = d.createElement("div");
  $cards_container.className = "cards-container";

  results.forEach((result) => {
    const options = {
      id: result.id,
      title: result.name || result.title,
      img: `${result.thumbnail.path}.${result.thumbnail.extension}`,
      url: result.resourceURI,
      section,
    };

    $cards_container.innerHTML += appCard(options);
  });

  app.$app.appendChild($cards_container);

  scrollReveal(d.querySelectorAll(".card"), {
    distance: "100px",
    duration: ".5s",
    opacity: 0,
    repeat: false,
    scale: 0.8,
  });

  lazyLoading(".app img", "src");

  app.$app_loader.classList.remove("active");
}

export const functionsApp = {
  CHARACTERS: printCharacter,
  COMICS: printComic,
  SERIES: printSerie,
};

async function printCharacter(url = "") {
  try {
    app.$app_loader.classList.add("active");
    app.$app.innerHTML = "";
    let data = await getData(url),
      result = data.data.results[0];
    console.log(data);

    const info = {
        id: result.id,
        name: result.name,
        description: result.description
          ? result.description
          : "Description not found, I'm sorry! :(",
        img: `${result.thumbnail.path}.${result.thumbnail.extension}`,
        urls: [...result.urls],
        logs: {
          comics: [...result.comics.items],
          series: [...result.series.items],
        },
      },
      $characterInfo = d.createElement("section"),
      $characterHeader = d.createElement("header");

    $characterInfo.className = "character-info";
    $characterHeader.className = "character-header";
    $characterHeader.style.backgroundImage = `url("${info.img}")`;

    $characterHeader.innerHTML += `
    <div class="character-header-wrapper">
      <h2 class="character-name">${info.name}</h2>
      <p class="character-description">
        ${info.description}
      </p>
    </div>
        `;

    $characterHeader.innerHTML += `
    <nav class="character-navbar">
      <div class="navbar-wrapper">
        <div id="log-comics" class="navbar-item active">COMICS</div>
        <div id="log-series" class="navbar-item">SERIES</div>
        <div id="log-urls" class="navbar-item">MORE</div>
      </div>
    </nav>
    `;

    $characterInfo.appendChild($characterHeader);
    $characterInfo.innerHTML += `
    <section class="character-logs">
      <section data-id="log-comics" class="character-log active">
        <div class="log-loader active">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        <div>
      </section>
      <section data-id="log-series" class="character-log">
        <div class="log-loader active">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        <div>
      </section>
      <section data-id="log-urls" class="character-log urls">
        <div class="log-loader active">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        <div>
      </section>
    </section>
    `;

    app.$app.appendChild($characterInfo);
    app.$app_loader.classList.remove("active");
    const navbarItems = d.querySelectorAll(".navbar-item");
    const characterLogs = d.querySelectorAll(".character-log");
    navbarItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        navbarItems.forEach((item) => item.classList.remove("active"));
        characterLogs.forEach((item) => item.classList.remove("active"));
        e.target.classList.add("active");
        d.querySelector(
          `.character-log[data-id="${e.target.id}"]`
        ).classList.add("active");
        app.$app.scrollTop = 450;
      });
    });

    console.log(info.urls);

    for (const log in info.logs) {
      let loga = info.logs[log],
        length = loga.length,
        cards = "";

      const sectionLog = d.querySelector(`[data-id="log-${log}"]`);

      for (let i = 0; i < length; i++) {
        let data = await getData(loga[i].resourceURI + api.HASH);

        data = data.data.results[0];

        const options = {
          id: data.id,
          title: data.title,
          img: data.thumbnail.path + "." + data.thumbnail.extension,
          url: data.resourceURI,
          section: log.toUpperCase(),
        };
        cards += appCard(options);
      }

      if (!length) {
        sectionLog.innerHTML += `
        <div class="not-found">
        <ion-icon name="close-circle-outline"></ion-icon>
        <span>I'm sorry! this character has no ${log}</span>
        </div>
        `
      }

      sectionLog.innerHTML += cards;

      lazyLoading(`[data-id="log-${log}"] img`);
      sectionLog.querySelector(`.log-loader`).classList.remove("active");
      sectionLog.style.maxHeight = "initial";
    }

    const icons = {
      comiclink: `<ion-icon name="book-outline"></ion-icon>`,
      wiki: `<ion-icon name="globe-outline"></ion-icon>`,
      detail: `<ion-icon name="information-circle-outline"></ion-icon>`
    }

    const sectionUrls = d.querySelector(`[data-id="log-urls"]`),
      $urlWrapper = d.createElement("div");
    $urlWrapper.className = "urls-wrapper";

    for (let i = 0; i < info.urls.length; i++) {
      $urlWrapper.innerHTML += `
      <a
        href="${info.urls[i].url}"
        target="_blank"
        rel="nofollow"
        class="back-link"
      >
        <div class="back-link-icon"><ion-icon name="chevron-forward-outline"></ion-icon></div>
        <span>${info.urls[i].type}</span>
        <div class="back-link-icon">${icons[info.urls[i].type]}</div>
      </a>
      `
    }
    sectionUrls.appendChild($urlWrapper);
    sectionUrls.innerHTML += `
    <div class="attribution"></div>
    `;
    console.log(sectionUrls);
    sectionUrls.querySelector(".log-loader").classList.remove("active");
  } catch (error) {
    console.log(error);
  }
}

async function printComic(url = "") {
  console.log("COMICS");
}

async function printSerie(url = "") {
  console.log("SERIES");
}
