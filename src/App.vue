<template>
  <div id="app">
    <div class="featuredPokemon" v-if="featuredPokemon">
      <h1>{{featuredPokemon.name}}</h1>
      <p>Types:</p>
      <ul>
        <li v-for="(type, i) in featuredPokemon.types" :key="i">
          {{type.type.name}}
        </li>
      </ul>
      <img :src="featuredPokemon.sprites.front_default" />
    </div>
    <child-component :pokemon="pokemon" @getDetails="getPokeDetails" @sortPokemon="sortColumn" @previousPage="getPrevPage" @nextPage="getNextPage"></child-component>
  </div>
</template>

<script>
import ChildComponent from './Child.vue'
import axios from 'axios';
import _ from 'underscore';

export default {
  name: 'app',
  data () {
    return {
      pokemon: [],
      next: "",
      previous: "" ,
      featuredPokemon: ""
    }
  },
  components: {
    ChildComponent
  },
  methods: {
    sortColumn(ascending) {
      if (ascending) {
        this.pokemon = _.sortBy(this.pokemon, 'name').reverse();
      } else {
        this.pokemon = _.sortBy(this.pokemon, 'name');
      }
    },
    getPrevPage () {
      if(this.previous) {
        axios.get(this.previous).then(res => {
          this.pokemon = res.data.results;
          this.next = res.data.next;
          this.previous = res.data.previous;
        }).catch(err => console.log('err', err));
      } else {
        alert('This is the first page dummy');
      }
    },
    getNextPage () {
      if(this.next) {
        axios.get(this.next).then(res => {
          this.pokemon = res.data.results;
          this.next = res.data.next;
          this.previous = res.data.previous;
        }).catch(err => console.log('err', err));
      } else {
        alert('This is the last page dummy');
      }
    },
    getPokeDetails(value) {
      axios.get(value).then(res => {
          this.featuredPokemon = res.data;
      }).catch(err => console.log('err', err));
    }
  },
  mounted() {
      axios.get('http://pokeapi.co/api/v2/pokemon/').then(res => {
        this.pokemon = res.data.results;
        this.next = res.data.next;
        this.previous = res.data.previous;
      }).catch(err => console.log('err', err));
  }
}
</script>

<style lang="scss">
  html {
    min-height: 100%;
  }
  body {
    background-image: url("https://images7.alphacoders.com/592/thumb-1920-592678.jpg");
    background-repeat: none;
    background-position: top;
    font-family: 'Rammetto One', cursive;
    margin: 0;
    padding: 0;
    min-height:100%;
  }
  li, ul {
    margin: 0;
    padding: 0;
    color: fuchsia;
  }
  .featuredPokemon {
    p, h1 {
      margin: 0;
    }
    background: rgba(255, 240, 255, 0.5);
    text-align: center;
  }
</style>
