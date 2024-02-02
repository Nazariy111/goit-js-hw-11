const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    
    const searchWord = e.target.elements.word.value;

    searchImage(searchWord);

};


function searchImage(searchWord) {
    const URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = `?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`;

    const url = URL + END_POINT + PARAMS; 

    return fetch(url).then(res => res.json());
};

