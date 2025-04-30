import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";

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
        {searchQuery && <MovieList query={searchQuery} />}
      </form>
    </div>
  );
};
export default MoviesPage;
