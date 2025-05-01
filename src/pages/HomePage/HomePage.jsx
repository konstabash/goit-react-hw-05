import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchTrending } from "../../services/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const trendingData = await fetchTrending();
        setMovies(trendingData.results);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
