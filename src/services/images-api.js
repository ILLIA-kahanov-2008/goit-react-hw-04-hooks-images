import axios from 'axios';

const MY_KEY = '23141283-b767010b5d5526766e0fab830';

axios.defaults.baseURL = 'https://pixabay.com/api/';

function getImages(query, page) {
  return axios.get(
    `?image_type="photo"&orientation="horizontal"&q=${query}&page=${page}&per_page=12&key=${MY_KEY}`,
  );
}

export const imagesAPI = {
  getImages
}

