import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchSearch } from "../../services/api";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const searchData = await fetchSearch(searchQuery);
        setMovies(searchData.results);
      } catch {
        (error) => console.log(error);
      }
    };
    getData();
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.input.value.trim();
    if (query) {
      searchParams.set(`query`, query);
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" name="input" />
        <button type="submit">Search</button>
        {searchQuery && <MovieList movies={movies} />}
      </form>
    </div>
  );
};
export default MoviesPage;
