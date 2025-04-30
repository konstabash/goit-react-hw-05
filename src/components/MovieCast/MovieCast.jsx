import { useParams } from "react-router-dom";
import { fetchCast } from "../../services/api";
import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const renderData = await fetchCast(movieId);
        setCast(renderData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [movieId]);

  if (isLoading || !cast) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={s.container}>
      {cast.cast.slice(0, 10).map((member) => (
        <li className={s.actor} key={member.id}>
          <img
            className={s.castImage}
            src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
            alt={member.name}
          />
          <p>{member.name}</p>
          <p>Character: {member.character}</p>
        </li>
      ))}
    </ul>
  );
};
export default MovieCast;
