import { useParams } from "react-router-dom";
import { fetchReviews } from "../../services/api";
import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const renderData = await fetchReviews(movieId);
        setReviews(renderData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [movieId]);

  if (isLoading || !reviews) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={s.container}>
      {reviews.results.length === 0 && (
        <p>We don't have any reviews for this movie</p>
      )}

      {reviews.results.slice(0, 5).map((review) => (
        <li className={s.review} key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};
export default MovieReviews;
