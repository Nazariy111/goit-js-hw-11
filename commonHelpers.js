import{S as g,i}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const o={formEl:document.querySelector(".search-form"),galleryEl:document.querySelector(".gallery-box"),btnEl:document.querySelector(".search-btn")};document.querySelector(".loader-box");o.formEl.addEventListener("submit",y);o.formEl.addEventListener("input",l=>{o.formEl.elements.word.value.trim()&&(o.btnEl.disabled=!1,o.btnEl.classList.remove("disabled"))});function y(l){l.preventDefault(),o.formEl.insertAdjacentHTML("afterend",'<div class="loader-box "><span class="loader"></span></div>');const r=document.querySelector(".loader-box"),n=document.querySelector(".gallery");n&&n.remove();const s='<div class="gallery"></div>';o.galleryEl.insertAdjacentHTML("afterbegin",s);const e=l.target.elements.word.value.trim();e?p(e).then(t=>{let a=t.hits;a.length>0?(r.remove(),h(a),new g(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()):(r.remove(),i.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!"}))}):(r.remove(),i.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"The field is empty. Please enter a word!"})),o.formEl.reset(),o.btnEl.disabled=!0,o.btnEl.classList.add("disabled")}function p(l){const r="https://pixabay.com",n="/api/",s=`?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${l}&image_type=photo&orientation=horizontal&safesearch=true`,e=r+n+s;return fetch(e).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).catch(t=>console.log(t))}function h(l){const r=l.map(s=>{const{id:e,largeImageURL:t,webformatURL:a,tags:c,likes:d,views:m,comments:u,downloads:f}=s;return`<a class="gallery-link" href="${t}">
          <div class="gallery-item" id="${e}">
            <img class="gallery-image" src="${a}" alt="${c}" loading="lazy" data-source="${t}"/>
            <div class="info">
              <p class="info-item"><b>Likes</b>${d}</p>
              <p class="info-item"><b>Views</b>${m}</p>
              <p class="info-item"><b>Comments</b>${u}</p>
              <p class="info-item"><b>Downloads</b>${f}</p>
            </div>
          </div>
        </a>`}).join("");o.galleryEl.querySelector(".gallery").insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=commonHelpers.js.map
