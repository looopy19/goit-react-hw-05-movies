import { useState, useEffect } from "react";
import * as themoviedbAPI from "../services/api-movies";
import noImage from "../images/noImage.jpg";
import s from "./Views.module.css";

export default function CastView({ moviesId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    themoviedbAPI.getCastMovie(moviesId).then((data) => {
      if (data.cast.length === 0) {
        throw new Error("Is not avaliable");
      }
      setCast(data.cast);
    });
  }, [moviesId]);

  return (
    <div>
      {cast && (
        <ul className={s.cast}>
          {cast.map((item) => (
            <li key={item.id} className={s.castItem}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${item.profile_path}`
                    : noImage
                }
                alt={item.name}
                width="100"
                height="150"
                className={s.castImg}
              />
              <p>{item.name}</p>
              <p className={s.character}>
                Character: <br />
                {item.character}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}