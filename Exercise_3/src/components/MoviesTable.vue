<template>
  <div>
    <table class="table-condensed table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Production Year</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in moviesToDisplay" :key="index">
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
export default {
  name: "MoviesTable",
  data() {
    return {
      movies: [],
      howManyLoaded: 0,
      moviesToDisplay: this.movies,
    };
  },
  methods: {
    loadMore() {
      this.howManyLoaded += 10;
      this.moviesToDisplay = this.movies.slice(0, this.howManyLoaded);
    },
  },
  created() {
    this.$emitter.emit("update-data");
    this.$emitter.on("search-change-params", (movies) => {
      this.movies = movies;
      this.loadMore();
    });
  },
};
</script>

<style></style>
