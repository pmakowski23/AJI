<template>
  <h1>Filmy wg obsady</h1>
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
      <tr v-for="(movie, index) in movies" :key="index">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.cast }}</td>
        <td>{{ movie.genres }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
	name: 'CastMoviesList',
  props: {
    movies: Array
  }
};
</script>

<style></style>
