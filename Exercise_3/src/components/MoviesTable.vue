<template>
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
    <button v-on:click="loadMore">Load More</button>
  </div>
</template>

<script>
export default {
  name: "MoviesTable",
  props: {
    movies: Array,
  },
  data() {
    return {
      howManyLoaded: 0,
      moviesToDisplay: this.movies.slice(this.howManyLoaded),
    };
  },
  methods: {
    loadMore() {
      this.howManyLoaded += 10;
      this.moviesToDisplay = this.movies.slice(0, this.howManyLoaded);
    },
  },
  mounted() {
    this.loadMore();
  },
};
</script>

<style></style>
