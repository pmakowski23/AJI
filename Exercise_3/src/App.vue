<template>
  <h3>
    <Search />
    <MoviesTable v-bind:movies="this.movies" />
    <GenreMoviesList />
    <CastMoviesList />
  </h3>
</template>

<script>
import Search from "./components/Search.vue";
import MoviesTable from "./components/MoviesTable.vue";
import GenreMoviesList from "./components/GenreMoviesList.vue";
import CastMoviesList from "./components/CastMoviesList.vue";

import moviesData from "./assets/movies.json";

const moviesList = moviesData.slice(600, 700);

import filter from "lodash/filter";
import unset from 'lodash/unset';
import mapKeys from 'lodash/mapKeys';

const doesTitleEqual = (params, object) => {
  const isMovieTitleProvided = params.movieTitle;
  if (!isMovieTitleProvided) return true;
  const isSearchedTitleSameAsCurrentObjects =
    object.title === params.movieTitle;
  return isSearchedTitleSameAsCurrentObjects;
};

const isDateEligible = (params, object) => {
  const areDatesProvided = !!params.dateFrom || !!params.dateTo;
  if (!areDatesProvided) return true;
  const isMovieDateBetweenSearchDates = !params.dateTo // If dateTo is not provided
    ? object.year >= params.dateFrom
    : !params.dateFrom // If dateFrom is not provided
    ? object.year <= params.dateTo
    : object.year <= params.dateTo && object.year >= params.dateFrom; // If both are provided
  return isMovieDateBetweenSearchDates;
};

const isThereSomeoneFromTheCast = (params, object) => {
  const isCastProvided = params.cast;
  if (!isCastProvided) return true;
  const isProvidedCastInThisObject = object.cast.includes(params.cast);
  return isProvidedCastInThisObject;
};

export default {
  name: "App",
  components: {
    Search,
    MoviesTable,
    GenreMoviesList,
    CastMoviesList,
  },
  data() {
    return {
      movies: moviesList,
    };
  },
  methods: {
    filterData(changedParams) {
      mapKeys(changedParams, (value, key) => {
        if (!value) unset(changedParams, key);
      });
      const filteredMovies = filter(moviesList, (o) => {
        return (
          doesTitleEqual(changedParams, o) &&
          isDateEligible(changedParams, o) &&
          isThereSomeoneFromTheCast(changedParams, o)
        );
      });
      this.movies = filteredMovies;
    },
  },
  mounted() {
    this.$emitter.on("search-change-params", (e) => this.filterData(e));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin: 1rem auto;
  padding: 0 10rem;
}
</style>
