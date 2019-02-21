<template>
  <router-view
    v-on:gotoArtists="gotoArtists"
    v-on:gotoTracks="gotoTracks"
  />
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      position: null,
      artistId: null,
    }
  },

  methods: {
    gotoTracks(position, artistId) {
      this.position = position
      this.artistId = artistId

      this.$router.push({
        name: 'tracks',
        params: {
          id: artistId,
          position: position
        }
      })
    },

    gotoArtists() {
      this.$router.push({
        name: 'artists',
        params: {
          id: this.artistId,
          position: this.position
        }
      })
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  line-height: 1.6;
  color: #fff;
  background-color: #191a28;
  padding-bottom: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
}

ul {
  list-style: none;
}
</style>
