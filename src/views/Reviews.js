import { useState, useEffect } from "react";
import * as themoviedbAPI from "../services/api-movies";
import s from "./Views.module.css";

export default function ReviewsView({ moviesId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    themoviedbAPI.getReviewsMovie(moviesId).then((data) => {
      console.log(data.results);

      setReviews(data.results);
    });
  }, [moviesId]);

  return (
    <>
      <div className={s.review}>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>
                  <b>AUTHOR: </b> {review.author}
                </p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We do not have any reviews for this movie.</p>
        )}
      </div>
    </>
  );
}