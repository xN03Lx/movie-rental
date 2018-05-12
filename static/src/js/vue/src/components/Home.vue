<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">Movie Rental</span>
         </v-toolbar-title>
      <v-text-field 
        flat
        solo-           
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        @input="realTimeSearch"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <div v-if="loading">
            <v-progress-circular indeterminate color="white"></v-progress-circular>    
        </div>
        <div v-if="!loading">
          <v-avatar size="32px">
            <img
              src="https://vuetifyjs.com/static/doc-images/logo.svg"
              alt="Vuetify"
            >
          </v-avatar>
        </div>
      </v-btn>
    </v-toolbar>
    <v-content>
          <mr-movie-list :data="movies" :mode="modeView"/>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="toggleDialog()"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog :value="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Register New Movie
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
  
                <v-text-field
                  prepend-icon="movies"
                  placeholder="Name"
                  data-vv-name="name"
                  v-model="newMovie.name"
                  :rules="getMessage('name')"
                  :validate-on-blur="true"
                  v-validate="'required'"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-select
                :items="categories"
                item-value="id"
                item-text="name"
                label="Category"
                data-vv-name="categories"
                multiple
                max-height="400"
                hint="Pick categories"
                persistent-hint
                prepend-icon="category"
                v-model="newMovie.categories"
                :validate-on-blur="true"
                :error-messages="getMessage('categories')"
                v-validate="'required'"

              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-select
                :items="types"
                item-value="id"
                item-text="name"
                data-vv-name="types"
                label="Type"
                multiple
                max-height="400"
                hint="Pick types"
                persistent-hint
                prepend-icon="art_track"
                v-model="newMovie.types"
                :validate-on-blur="true"
                :error-messages="getMessage('types')"
                v-validate="'required'"

              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="date_range"
                placeholder="Year"
                v-model="newMovie.year"
                data-vv-name="year"
                :rules="getMessage('year')"
                :validate-on-blur="true"
                v-validate="'required|numeric'"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="description"
                placeholder="Description"
                v-model="newMovie.description"
                :rules="getMessage('description')"
                :validate-on-blur="true"
                data-vv-name="description"
                v-validate="'required'"

              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>


          <v-btn flat color="primary" @click="toggleDialog()">Cancel</v-btn>
          <v-btn flat @click="formSave(newMovie)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import MrMovieList from './MrMovieList'
  export default {
    name: "home",
    components: {
      MrMovieList
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'local_movies', text: 'Movies' },
        { icon: 'category', text: 'Categories' },
        { icon: 'art_track', text: 'Type' },

      ], 
      newMovie: {
        id: -1,
        name: '',
        categories: [],
        types: [],
        year: 0,
        description: '',
      },
      search: '',
      modeView: 'normal'
    }),
    props: {
      source: String
    },
    mounted(){
        this.loadCategories();
        this.loadTypes();
        this.loadMovies();
    },
    methods: {
      ...mapActions([
        'loadMovies', 
        'loadTypes', 
        'loadCategories',
        'createMovie', 
        'toggleDialog',
        'searchMovie'
        ]),
        getMessage: function(field){
          return(!this.errors.has(field))? [] : [this.errors.first(field)]
        },
        formSave: function(data){
          this.$validator.validate().then(result =>{
            if(result){
              this.createMovie(data)
            }
          });
        },
        realTimeSearch: function(value){
          this.modeView = (value === '') ? 'normal' : 'search';
          this.searchMovie(value);

        }
    },
    computed: {
      ...mapState(['dialog',
       'categories', 
       'types', 
       'movies',
       'loading'
       ])
    },
  }
</script>