import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let query = '';
let page = 1;
let loadedImagesCount = 0;

const handleImageRequest = async () => {
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    loadedImagesCount += data.hits.length;

    if (page > 1) {
      smoothScroll();
    }

    if (loadedImagesCount >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  loadedImagesCount = 0;
  clearGallery();

  await handleImageRequest();
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  await handleImageRequest();
});
