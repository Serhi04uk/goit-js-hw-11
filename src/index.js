import Notiflix from 'notiflix';
import { getImages } from './servisec/api';
import { createMarkup, galleryEl, buttonEl } from './markup';

const formEl = document.querySelector('.search-form');

buttonEl.addEventListener('click', loadMore);
formEl.addEventListener('submit', onSubmit);
let query = '';
let currentPage = 1;
let photosLeft = 0;

function onSubmit(event) {
  event.preventDefault();
  currentPage = 1;

  galleryEl.innerHTML = '';
  query = event.currentTarget.elements.searchQuery.value;

  getImages(query, currentPage).then(data => {
    if (data.hits.length !== 0) {
      createMarkup(data);
      photosLeft = data.totalHits - data.hits.length;
      console.log(data.hits.length);
    } else {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}
buttonEl.classList.add('ishiden');
export function loadMore() {
  currentPage += 1;

  getImages(query, currentPage).then(data => {
    photosLeft -= data.hits.length;

    if (photosLeft > 0) {
      buttonEl.classList.remove('ishiden');
      createMarkup(data);
    } else {
      buttonEl.classList.add('ishiden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}
