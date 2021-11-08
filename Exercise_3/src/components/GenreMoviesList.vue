<template>
  <div>
    <h1>Filmy wg gatunku</h1>
    <table class="table-condensed table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Production Year</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody v-for="(genre, index1) in grouped" :key="index1">
        <h1>{{ Object.keys(genre)[0] }}</h1>
        <tr
          v-for="(movie, index2) in genre[Object.keys(genre)[0]]"
          :key="index2"
        >
          <td>{{ movie.title }}</td>
          <td>{{ movie.year }}</td>
          <td>{{ movie.cast }}</td>
          <td>{{ movie.genres }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="howManyLoaded <= movies.length">
      <button class="btn btn-info col-sm-12" v-on:click="loadMore">
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import concat from "lodash/concat";
import compact from "lodash/compact";

export default {
  name: "GenreMoviesList",
  data() {
    return {
      movies: [],
      grouped: [],
      howManyLoaded: 0,
      moviesToDisplay: this.movies,
    };
  },
  methods: {
    loadMore() {
      this.howManyLoaded += 10;
      this.moviesToDisplay = this.movies.slice(0, this.howManyLoaded);
    },
    group() {
      this.allGenres = [];
      this.moviesToDisplay.forEach((value) => {
        this.allGenres = concat(this.allGenres, value.genres);
      });
      this.allGenres = compact(Array.from(new Set(this.allGenres)));

      console.log(this.allGenres);

      this.grouped = this.allGenres.map((genre) => ({
        [genre]: this.moviesToDisplay.filter((movie) =>
          movie.genres.includes(genre)
        ),
      }));
    },
  },
  created() {
    this.$emitter.emit("update-data");
    this.$emitter.on("search-change-params", (movies) => {
      this.movies = movies;
      this.loadMore();
      this.group();
    });
  },
};
</script>

<style></style>
