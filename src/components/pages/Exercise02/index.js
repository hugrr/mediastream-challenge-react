/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import * as React from "react";
import mountains from "../Exercise02/assets/mountains.jpeg";

import Grid from "@mui/material/Grid";
import { color, positions } from "@mui/system";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataDetalle, loadingHooks] = useGetData();
  const [genre, setGenre] = useState("");
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [order, setOrder] = useState(false);

  const handleChange = (event) => {
    setGenre(event.target.value);
  };
  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    fetch("http://localhost:3001/movies?_limit=100")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setMoviesFilter(data);

        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };
  const filterMOvies = () => {
    const moviesFiler = movies.filter((item) => item.genres.includes(genre));
    setMoviesFilter(moviesFiler);
    console.log(moviesFiler, "filter");
  };

  useEffect(() => {
    handleMovieFetch();
    console.log(moviesFilter, "accadetalle");
  }, []);
  useEffect(() => {
    filterMOvies();
  }, [genre]);

  const changeOrder = () => {
    if (!order) {
      setMoviesFilter(moviesFilter.reverse());
      setOrder(true);
    }
    if (order) {
      setMoviesFilter(moviesFilter.sort());
      setOrder(false);
    }
  };
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(46, 39, 39, 0),rgb(5, 5, 5)10%), url(${mountains})`,
          width: "100%",
          minHeight: "1000%",
          position: `absolute`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          style={{ paddingTop: 200, paddingLeft: 75 }}
          className="movie-library__title"
        >
          Movie Library
        </h1>
        <Grid container>
          <Grid
            item
            xs={2}
            sm={12}
            md={12}
            sx={{ alignContent: "center", alignItems: "center" }}
          >
            <div className="movie-library__actions">
              <select
                onChange={handleChange}
                value={genre}
                name="genre"
                placeholder="Search by genre..."
                style={{
                  borderColor: "var(--ms-green)",
                  marginTop: 20,
                }}
              >
                <option value="">"Search by genre..."</option>
                {dataDetalle &&
                  dataDetalle.map((el, index) => <option>{el}</option>)}
              </select>

              <button
                style={{
                  background: "rgb(131, 193, 65)",
                  marginTop: 20,
                }}
                onClick={changeOrder}
              >
                Change order
              </button>
            </div>
          </Grid>
        </Grid>
        {loading ? (
          <div className="movie-library__loading">
            <p>Loading...</p>
            <p>Fetched {fetchCount} times</p>
          </div>
        ) : (
          <div>
            <Grid
              container
              columns={{ xs: 2, sm: 6, md: 12 }}
              sx={{ alignItems: "center" }}
            >
              {moviesFilter.length > 0 &&
                moviesFilter.map((movie, index) => (
                  <Grid item xs={2} sm={3} md={3} key={index}>
                    <div
                      style={{
                        background: `linear-gradient( rgba(0, 0, 0, 0)30%, var(--ms-green)), url(${movie.posterUrl})`,
                        height: 350,
                        width: 250,
                        marginTop: 50,
                        marginRight: 80,
                        marginLeft: 50,
                      }}
                    >
                      <h1
                        style={{
                          paddingTop: 280,
                          color: "white",
                          paddingLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {movie.title}
                      </h1>
                      <h3
                        style={{
                          paddingTop: 5,
                          color: "white",
                          paddingLeft: 10,
                          fontSize: 12,
                        }}
                      >
                        {movie.genres}
                      </h3>
                      <h3
                        style={{
                          paddingTop: 5,
                          color: "white",
                          paddingLeft: 10,
                          fontSize: 12,
                        }}
                      >
                        {movie.year}
                      </h3>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
        )}
      </div>
    </>
  );
}
