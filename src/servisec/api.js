import axios from 'axios';

const apiKey = '37106138-a69de58336818b0d1ada882c5';

export async function getImages(q, page) {
  try {
    const { data } = await axios('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
