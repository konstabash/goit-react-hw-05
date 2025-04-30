import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending today</h1>
      <MovieList query={""} />
    </div>
  );
};

export default HomePage;
