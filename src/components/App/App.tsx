import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovies(query);

        if (data.length === 0) {
          toast("No movies found for your request.");
        }

        setMovies(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, [query]);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <SearchBar
        onSubmit={(newQuery) => {
          setMovies([]);
          setQuery(newQuery);
        }}
      />

      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}