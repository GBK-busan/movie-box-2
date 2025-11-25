import "./MovieList.css";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function MovieList({ type, title }) {
  // movies state 상태 관리하기
  const [movies, setMovies] = useState([]);
  // movies 필터링 상태 관리하기
  const [filterMovies, setFilterMovies] = useState([]);
  // 최소 평점 상태 관리하기
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, [type]); // 최초실행 시점에 한번, type이 변경될 때마다 실행

  //분류 및 정렬 상태 관리하기
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  // 분류 및 정렬 상태 변경 함수
  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  // sort 상태 변경 시마다 filterMovies 정렬하기
  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]); //sort 상태 변경 시마다 실행

  // 영화 데이터 불러와서 movies 상태 업데이트 하기
  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${
        import.meta.env.VITE_theMovieDB_api_key
      }&language=ko`
    );
    const data = await response.json();
    setMovies(data.results);
    return setFilterMovies(data.results);
  };

  // rate보다 높은 영화만 필터링 함수에 담기
  const handleFilter = (rate) => {
    if (minRating === rate) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  return (
    <section className="movie_list" id={`${type}`}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">{title}</h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li
              className={
                minRating === 8
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => {
                handleFilter(8);
              }}
            >
              8+ Star
            </li>
            <li
              className={
                minRating === 7
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => {
                handleFilter(7);
              }}
            >
              7+ Star
            </li>
            <li
              className={
                minRating === 6
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => {
                handleFilter(6);
              }}
            >
              6+ Star
            </li>
          </ul>

          <select
            name="by"
            id="by"
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="default">분류</option>
            <option value="release_date">날짜</option>
            <option value="vote_average">평점</option>
          </select>
          <select
            name="order"
            id="order"
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
