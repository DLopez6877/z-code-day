<template>
  <div id="child">
      <div class="col">
        <div class="colHead sortBy" @click="notifyParent">Sort By Name</div>
        <div class="colHead pagination">
            <span class="pageLeft" @click="prevPage"><<</span>
            <span class="pageRight" @click="nextPage">>></span>
        </div>
        <div class="pokemonNames" v-for="(mon) in pokemon" :key="mon.name" @click="getDetails(mon.url)">{{ mon.name }}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'child',
  data() {
      return {
          ascending: false
      }
  },
  props: {
      pokemon: {
          type: Array,
          required: true
      }
  },
  methods: {
      notifyParent (event) {
          this.$emit('sortPokemon', this.ascending);
          this.ascending = !this.ascending;
      },
      prevPage (event) {
          this.$emit('previousPage');
      },
      nextPage (event) {
          this.$emit('nextPage');
      },
      getDetails(pokemonURL) {
          this.$emit('getDetails', pokemonURL);
      }
  }
}
</script>

<style lang="scss">
    .colHead {
        color: lightgoldenrodyellow;
        border-bottom: 2px solid slategray;
    }
    .pagination {
        background: tomato;
        display: flex;
        padding: 0px 20px;
        justify-content: space-between;
        span {
            transition: all .5;
            cursor: pointer;
            font-weight: 900;
        }
        .pageLeft:hover {
            transform: scale(1.4);
        }
        .pageRight:hover {
            transform: scale(1.4);
        }
    }
    .sortBy {
        background: rebeccapurple;
        text-align: center;
        &:hover {
            background-color: midnightblue;
            cursor: pointer;
        }
    }
    .col {
        background: rgba(46, 139, 87, 0.5);
        border: 2px solid slategray;
    }
    .pokemonNames {
        text-align: center;
        font-size: 20px;
        color: mistyrose;
        font-weight: 700;
        cursor: pointer;
        &:hover {
            color: fuchsia;
        }
    }
</style>
