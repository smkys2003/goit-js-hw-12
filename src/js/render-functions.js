import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const container = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const clearGallery = () => (container.innerHTML = '');
export const showLoader = () => loader.classList.remove('is-hidden');
export const hideLoader = () => loader.classList.add('is-hidden');
export const showLoadMoreButton = () =>
  loadMoreButton.classList.remove('is-hidden');
export const hideLoadMoreButton = () =>
  loadMoreButton.classList.add('is-hidden');

export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info-block">
        <div class="info-item"><b class="info-title">Likes</b><span class="info-value">${img.likes}</span></div>
        <div class="info-item"><b class="info-title">Views</b><span class="info-value">${img.views}</span></div>
        <div class="info-item"><b class="info-title">Comments</b><span class="info-value">${img.comments}</span></div>
        <div class="info-item"><b class="info-title">Downloads</b><span class="info-value">${img.downloads}</span></div>
      </div>
    </li>
  `
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function smoothScroll() {
  const firstCard = container.querySelector('.gallery-item');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
