import { useState, useEffect } from "react";
import { useHistory, Link, useRouteMatch, useLocation } from "react-router-dom";
import * as themoviedbAPI from "../services/api-movies";
import s from "./Views.module.css";
import noImage from "../images/noImage.jpg";

export default function HomeView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    themoviedbAPI
      .getTrendingMovies()
      .then((data) => {
        history.push("/");
        setMovies(data.results);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <>
      {movies && (
        <>
          <h1 className={s.trendToday}>Trending today</h1>
          <ul className={s.trendItem}>
            {movies.map((movie) => (
              <li key={movie.id} className={s.trendMovie}>
                <Link
                  to={{
                    pathname: `${url}movies/${movie.id}`,
                    state: { from: { location } },
                  }}
                  className={s.trendLink}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : noImage
                    }
                    alt={movie.title}
                    // width="320"
                    className={s.imageTrend}
                  />
                  <p className={s.title}>{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}