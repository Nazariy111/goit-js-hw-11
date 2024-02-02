import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let simpleLightBox;

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery-box'),
    btnEl: document.querySelector('.search-btn'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', e => {
    const searchWord = refs.formEl.elements.word.value.trim();
    if (searchWord) {
        refs.btnEl.disabled = false;
    };
});


function onFormSubmit(e) {
    e.preventDefault();
    const galleryParentElem = document.querySelector('.gallery');
    if (galleryParentElem) { galleryParentElem.remove(); };
    
    const galleryParentElemMarkup = '<div class="gallery"></div>';
    refs.galleryEl.insertAdjacentHTML("afterbegin", galleryParentElemMarkup);
    // simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    const searchWord = e.target.elements.word.value.trim();
    console.log(`word-${searchWord}-word`); 
    if (searchWord) { 
        
        searchImage(searchWord)
            .then(data => {
                let imagesArray = data.hits;
                if (imagesArray.length > 0) {
                    renderImages(imagesArray);
                    
                    simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }).refresh();
                } else {
                    console.log("Sorry, there are no images matching your search query. Please try again!");
                };
            });
    } else { 
        
        alert('tap something');
        console.log('error');
    };

    refs.formEl.reset();
    refs.btnEl.disabled = true;

};


function searchImage(searchWord) {
    const URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = `?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`;

    const url = URL + END_POINT + PARAMS; 

    return fetch(url).then(res => res.json());
};


function renderImages(imagesArray) {
    const markup = imagesArray
        .map(image => {
            const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
            return `<a class="gallery-link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`;})
        .join('');
    const gallery = refs.galleryEl.querySelector('.gallery');
    gallery.insertAdjacentHTML('beforeend', markup);
    
};

