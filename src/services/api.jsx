import axios from "axios";

const url =
  "https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDg0MjI0MTc0NTk5NmQyMjMyYjI5ZTFmMmJkMWQ3YiIsIm5iZiI6MTc0NTU3NjY1NS44NjcsInN1YiI6IjY4MGI2MmNmMTVhMWQ1YTYxNGFiNWY2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o5xLtwiEc8SZ5Q8JH7D4PBSsePLCYH67ilp_eQK-KmE",
  },
};

export const fetchTrending = async () => {
  const responce = await axios.get(url, options);
  return responce.data;
};

export const fetchSearch = async (query) => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return responce.data;
};

export const fetchById = async (id) => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  return responce.data;
};

export const fetchCast = async (id) => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    options
  );
  return responce.data;
};

export const fetchReviews = async (id) => {
  const responce = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews`,
    options
  );
  return responce.data;
};
