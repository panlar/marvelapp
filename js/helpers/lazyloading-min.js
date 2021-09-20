function lazyLoading(e = "img", t = "src") {
  const r = document.querySelectorAll(e);
  let n;
  "src" === t
    ? (n = new IntersectionObserver(loadingSRC))
    : "bg" === t && (n = new IntersectionObserver(loadingBG)),
    r.forEach((e) => n.observe(e));
}
function loadingSRC(e, t) {
  e.forEach((e) => {
    e.isIntersecting &&
      ((e.target.src = e.target.dataset.src), t.unobserve(e.target));
  });
}
function loadingBG(e, t) {
  e.forEach((e) => {
    e.isIntersecting &&
      ((e.target.style.backgroundImage = `url("${e.target.dataset.src}")`),
      t.unobserve(e.target));
  });
}

/* function youtube() {
  document.getElementById("columns").style = "max-height: calc(100vh - 56px);";
  document.getElementById("primary").style = "position: relative;";
  document.getElementById("secondary").style = "position: relative;";
  document.getElementById("primary-inner").style =
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow-y: auto;";
  document.getElementById("secondary-inner").style =
    "width: 100%; height: 100%; overflow-y: auto;";
} */
