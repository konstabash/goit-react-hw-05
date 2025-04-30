import { useEffect, useState } from "react";
import { fetchTrending, fetchSearch } from "../../services/api";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        if (query) {
          const searchData = await fetchSearch(query);
          setMovies(searchData.results);
        } else {
          const trendingData = await fetchTrending();
          setMovies(trendingData.results);
        }
      } catch {
        (error) => console.log(error);
      }
    };
    getData();
  }, [query]);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
