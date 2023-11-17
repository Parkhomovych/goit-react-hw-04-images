import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '38997661-54e537908498a57afa3a31c75';

export const fetchImg = async (query, currentPage) => {
  const params = new URLSearchParams({
    key: KEY,
    q: query,
    page: currentPage,
    per_page: 12,
  });
  const response = await axios.get(`${BASE_URL}${params}`);
  return response.data;
};
