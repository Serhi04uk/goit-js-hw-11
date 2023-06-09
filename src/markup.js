import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.gallery');

export const buttonEl = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

export function createMarkup(photo) {
  const markup = photo.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="photo-card" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="200" height="150"/>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
    </a>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  scrollSmooth();
  lightbox.refresh();
  buttonEl.classList.remove('ishiden');
}

function scrollSmooth() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
