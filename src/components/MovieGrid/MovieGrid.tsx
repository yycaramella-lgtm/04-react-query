import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({
  movies,
  onSelect,
}: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://placehold.co/500x750?text=No+Image";

        return (
          <li key={movie.id}>
            <div
              className={css.card}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(movie)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSelect(movie);
                }
              }}
            >
              <img
                className={css.image}
                src={poster}
                alt={movie.title}
                loading="lazy"
              />

              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}