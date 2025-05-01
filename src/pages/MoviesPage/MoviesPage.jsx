import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchSearch } from "../../services/api";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!searchQuery) return;

      try {
        setError(null);
        setIsLoading(true);
        const searchData = await fetchSearch(searchQuery);
        setMovies(searchData.results);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
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
      </form>
      {isLoading && <p>Loading ...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {searchQuery && !isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
