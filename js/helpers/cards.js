export function resultCard({id, title, img, url, index, section}){
  return `
  <div 
    class="card"
    data-id="${id}"
    data-url="${url}"
    data-section="${section}"
    style="animation-delay: ${0.05*(index+1)}s"
  >
    <div class="card-wrapper">
      <div class="card-img">
        <div class="img-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img
          alt="${title}"
          data-src="${img.replace(/^https|http/gi, "https")}"
          onload="setTimeout(()=>{this.previousElementSibling.classList.add('active')},500)"
        >
      </div>
      <div class="card-title">${title}</div>
    </div>
  </div>
  `
}

export function historyCard({id, title, img, url, index, section}){
  return `
  <div
    class="card"
    data-id="${id}"
    data-url="${url}" style="animation-delay: ${0.05*(index+1)}s"
    data-section="${section}"
  >
    <div class="card-wrapper">
      <div class="card-img">
        <div class="img-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img
          alt="${title}"
          data-src="${img.replace(/^https|http/gi, "https")}"
          onload="setTimeout(()=>{this.previousElementSibling.classList.add('active')},500)"
        >
      </div>
      <div class="card-title">${title}</div>
      <div class="card-delete">
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  </div>
  `
}

export function appCard({id, title, img, url, section}) {
  return `
  <div
    class="card"
    data-id="${id}"
    data-url="${url}"
    data-section="${section}"
  >
    <div class="card-wrapper">
      <div class="card-img">
        <div class="img-loader">
          <span></span><span></span><span></span>
        </div>
        <img 
          data-src="${img.replace(/^https|http/gi, "https")}"
          alt="${title}"
          onload="setTimeout(()=>{this.previousElementSibling.classList.add('active')},500)"
        >
      </div>
      <div class="card-title">
        <h5>${title}</h5>
        <div class="card-icon">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
    </div>
  </div>
  `
}
