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

const loader = document.querySelector('.loader-box');

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', e => {
    const searchWord = refs.formEl.elements.word.value.trim();
    if (searchWord) {
        refs.btnEl.disabled = false;
        refs.btnEl.classList.remove('disabled');
    };
});


function onFormSubmit(e) {
    e.preventDefault();
    refs.formEl.insertAdjacentHTML("afterend", '<div class="loader-box "><span class="loader"></span></div>');

    const loader = document.querySelector('.loader-box');

    const galleryParentElem = document.querySelector('.gallery');
    if (galleryParentElem) { galleryParentElem.remove(); };
    
    const galleryParentElemMarkup = '<div class="gallery"></div>';
    refs.galleryEl.insertAdjacentHTML("afterbegin", galleryParentElemMarkup);

    const searchWord = e.target.elements.word.value.trim();

    if (searchWord) { 
        searchImage(searchWord)
            .then(data => {
                let imagesArray = data.hits;

                if (imagesArray.length > 0) {
                    loader.remove();
                    renderImages(imagesArray);
                    
                    simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }).refresh();
                } else {
                    loader.remove();

                    iziToast.show({
                        timeout: 5000,
                        position: 'topCenter',
                        color: '#d11804',
                        messageColor: 'white',
                        titleColor: '#FFFFFF',
                        iconColor: '#FFFFFF',
                        message: "Sorry, there are no images matching your search query. Please try again!",
                    });
                };
            });
    } else { 
        loader.remove();
        
        iziToast.show({
            timeout: 5000,
            position: 'topCenter',
            color: '#d11804',
            messageColor: 'white',
            titleColor: '#FFFFFF',
            iconColor: '#FFFFFF',
            message: "The field is empty. Please enter a word!",
                    });
    };

    refs.formEl.reset();
    refs.btnEl.disabled = true;
    refs.btnEl.classList.add('disabled');

};


function searchImage(searchWord) {
    const URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = `?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`;

    const url = URL + END_POINT + PARAMS; 

    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            };
            return res.json();
        })
        .catch(error => console.log(error)); 
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

