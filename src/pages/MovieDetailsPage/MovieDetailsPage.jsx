import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import { fetchById } from "../../services/api";
import { useEffect, useRef, useState } from "react";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const renderData = await fetchById(movieId);
        setMovieData(renderData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [movieId]);

  if (isLoading || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={s.infoContainer}>
        <div>
          <Link className={s.backButton} to={goBackRef.current}>
            Go back
          </Link>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={s.detailsContainer}>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <div className={s.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={s.addInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <div className={s.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
