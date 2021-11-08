<template>
  <h3>
    <Search />
    <MoviesTable />
    <GenreMoviesList />
    <CastMoviesList />
  </h3>
</template>

<script>
import Search from "./components/Search.vue";
import MoviesTable from "./components/MoviesTable.vue";
import GenreMoviesList from "./components/GenreMoviesList.vue";
import CastMoviesList from "./components/CastMoviesList.vue";

export default {
  name: "App",
  components: {
    Search,
    MoviesTable,
    GenreMoviesList,
    CastMoviesList,
  }
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
