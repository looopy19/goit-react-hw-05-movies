import { useState, useEffect } from "react";
import {
  useHistory,
  useLocation,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar/SearchBar";
import * as themoviedbAPI from "../services/api-movies";
import noImage from "../images/noImage.jpg";
import s from "./Views.module.css";

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  const [error, setError] = useState();

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  const onChangeSearchQuery = (query) => {
    history.push({ ...location, search: `query=${query}` });
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    themoviedbAPI
      .getSearchMovie(searchQuery)
      .then((data) => {
        if (data.results.length === 0) {
          toast.error("Invalid request!");
          return;
        }
        setMovies(data.results);
      })
      .catch((error) => setError(error));
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSubmit={onChangeSearchQuery} />

      {movies && (
        <ul className={s.trendItem}>
          {movies.map((movie) => (
            <li key={movie.id} className={s.trendMovie}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : noImage
                }
                alt={movie.title}
                width="320"
                className={s.imageTrend}
              />
              <NavLink
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
                className={s.trendLink}
              >
                <p className={s.title}>{movie.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}