<template>
  <form v-on:submit.prevent>
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
      <input
        v-on:click="filterData"
        type="submit"
        class="btn btn-info col-sm-12"
        value="Szukaj"
      />
    </div>
  </form>
</template>

<script>
export default {
  sync: ["movieTitle", "dateFrom", "dateTo", "cast"],
};
</script>

<style></style>
