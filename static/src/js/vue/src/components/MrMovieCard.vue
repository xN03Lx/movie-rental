<template>
  <v-card color="blue-grey darken-2">
    <v-card-media
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0k2x0fKsvsKSphTNVvJ3swPcSFD6Lm47V6EU0dSnfast61BF"
      height="200px">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline white--text" v-text="movie.name" color="#000"></span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat dark >
        <v-icon right dark>check_circle</v-icon> Rent
      </v-btn>
    </v-card-actions>
  </v-card>

</template>
<script>
  export default {
    name: 'mr-movie-card',
    props: {
      movie: {
        type: Object,
        required: true

      }
  }
}
</script>

