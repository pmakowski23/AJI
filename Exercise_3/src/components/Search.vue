<template>
  <form v-on:submit.prevent="sendUpdate">
    <div class="form-group">
      <label for="inputTitle">Tytuł</label>
      <input
        type="text"
        id="inputTitle"
        class="form-control"
        placeholder="Podaj tytuł lub fragment tytułu filmu"
        v-model="movieTitle"
      />
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionFrom">
        Rok produkcji od:
      </label>
      <div class="col-sm-8">
        <input
          v-model="dateFrom"
          type="number"
          min="1900"
          max="2019"
          id="inputProductionFrom"
          class="form-control"
          placeholder="Liczba naturalna z przedziału 1900-2019"
        />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionTo">
        Rok produkcji do:
      </label>
      <div class="col-sm-8">
        <input
          v-model="dateTo"
          type="number"
          min="1900"
          max="2019"
          id="inputProductionTo"
          class="form-control"
          placeholder="Liczba naturalna z przedziału 1900-2019"
        />
      </div>
    </div>
    <div class="form-group">
      <label for="inputCast">Obsada</label>
      <input
        v-model="cast"
        type="text"
        id="inputCast"
        class="form-control"
        placeholder="Imię i nazwisko"
      />
    </div>
    <div class="form-group row">
      <input type="submit" class="btn btn-info col-sm-12" value="Szukaj" />
    </div>
  </form>
</template>

<script>
import moviesData from "../assets/movies.json";

const moviesList = moviesData.slice(600, 700);

import filter from "lodash/filter";
import unset from "lodash/unset";
import mapKeys from "lodash/mapKeys";

const doesTitleEqual = (params, object) => {
  const isMovieTitleProvided = params.movieTitle;
  if (!isMovieTitleProvided) return true;
  const isSearchedTitleSameAsCurrentObjects = object.title.toLowerCase().includes(
    params.movieTitle.toLowerCase()
  );
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
  const isProvidedCastInThisObject =
    object.cast.filter((movieCast) =>
      movieCast.toLowerCase().includes(params.cast.toLowerCase())
    ).length > 0;
  return isProvidedCastInThisObject;
};

export default {
  name: "Search",
  data() {
    return {
      movieTitle: "",
      dateFrom: "",
      dateTo: "",
      cast: "",
    };
  },
  methods: {
    filterData(changedParams) {
      mapKeys(changedParams, (value, key) => {
        if (!value) unset(changedParams, key);
      });
      return filter(
        moviesList,
        (o) =>
          doesTitleEqual(changedParams, o) &&
          isDateEligible(changedParams, o) &&
          isThereSomeoneFromTheCast(changedParams, o)
      );
    },
    sendUpdate() {
      this.$emitter.emit(
        "search-change-params",
        this.filterData({
          movieTitle: this.movieTitle,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          cast: this.cast,
        })
      );
    },
  },
  mounted() {
    this.$emitter.on("update-data", () => {
      this.sendUpdate();
    });
    this.sendUpdate();
  },
};
</script>

<style></style>
