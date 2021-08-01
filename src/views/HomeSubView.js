import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import * as themoviedbAPI from "../services/api-movies";
import noImage from "../images/noImage.jpg";
import s from "./Views.module.css";

const CastView = lazy(() =>
  import("./CastView" /* webpackChunkName: "cast-view" */)
);

const ReviewsView = lazy(() =>
  import("./Reviews" /* webpackChunkName: "review-view" */)
);

export default function HomeSubView() {
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    themoviedbAPI
      .getMoviesById(moviesId)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => setError(error));
  }, [moviesId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" className={s.button} onClick={onGoBack}>
            ⬅ Go back
          </button>
          <div className={s.movies}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : noImage
              }
              alt={movie.title}
              width="250"
            />
            <div className={s.about}>
              <h1 className={s.movieTitle}>{movie.title}</h1>
              <p>User Score: {movie.vote_average * 10}%</p>
              <p className={s.overview}>
                Overview
                <span className={s.descr}>{movie.overview}</span>
              </p>
              {movie.genres && (
                <>
                  <p className={s.genres}>Genres</p>
                  {movie.genres.map((item, index) => (
                    <span className={s.genresName} key={index}>
                      {item.name}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>

          <nav className={s.navigation}>

            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: { location } },
              }}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Cast
            </NavLink>

            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: { from: { location } },
              }}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Reviews
            </NavLink>
          </nav>

          <Suspense
            fallback={
              <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
                className={s.loader}
              />
            }
          >
            <Switch>
              <Route path={`${path}:moviesId/cast`}>
                <CastView moviesId={moviesId} />
              </Route>

              <Route path={`${path}:moviesId/reviews`}>
                <ReviewsView moviesId={moviesId} />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}