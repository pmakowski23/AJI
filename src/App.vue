<template>
  <h3>
    <Search :propName="searchProps"/>
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
  },
  data: () => {
    return {
      searchProps: {
        movieTitle: "",
        dateFrom: "",
        dateTo: "",
        cast: "",
      },
      movies: [
        {
          title: "Chained for Life",
          year: 1951,
          cast: ["Hilton Twins"],
          genres: [],
        },
        {
          title: "Cheese Chasers",
          year: 1951,
          cast: ["Looney Tunes"],
          genres: ["Animated"],
        },
        {
          title: "Chicago Calling",
          year: 1951,
          cast: ["Dan Duryea", "Mary Anderson"],
          genres: ["Noir"],
        },
        {
          title: "China Corsair",
          year: 1951,
          cast: ["Jon Hall", "Ernest Borgnine"],
          genres: ["Adventure"],
        },
        {
          title: "So This Is Paris",
          year: 1955,
          cast: ["Tony Curtis", "Gloria DeHaven"],
          genres: ["Musical"],
        },
        {
          title: "Soldier of Fortune",
          year: 1955,
          cast: ["Clark Gable", "Susan Hayward"],
          genres: ["Drama"],
        },
        {
          title: "Son of Sinbad",
          year: 1955,
          cast: ["Dale Robertson", "Sally Forrest", "Vincent Price"],
          genres: ["Adventure"],
        },
        {
          title: "Southbound Duckling",
          year: 1955,
          cast: ["Tom and Jerry"],
          genres: ["Animated"],
        },
        {
          title: "Special Delivery",
          year: 1955,
          cast: ["Joseph Cotten", "Eva Bartok"],
          genres: ["Comedy"],
        },
      ],
    };
  },
  methods: {
    filterData() {
      this.movies = [];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 1rem auto;
  padding: 0 10rem;
}
</style>
