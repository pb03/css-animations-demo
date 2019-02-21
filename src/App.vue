<template>
  <main class="main">
    <aside>
      <Sidebar />
    </aside>

    <section>
      <transition name="main" :duration="{ leave: 800 }">
        <router-view/>
      </transition>
    </section>

    <Player />
  </main>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Player from './components/Player.vue'

export default {
  name: 'app',

  components: {
    Sidebar,
    Player
  },

  data() {
    return {
      tilePosition: {},
      artistId: null,
    }
  },

  created() {
    this.$root.$on('gotoTracks', (position, artistId) => {
      this.tilePosition = position
      this.artistId = artistId

      this.$router.push({
        name: 'tracks',
        params: {
          id: artistId,
          position: position
        }
      })
    })

    this.$root.$on('gotoArtists', () => {
      this.$router.push({
        name: 'artists',
        params: {
          id: this.artistId,
          position: this.tilePosition
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}

aside {
  position: fixed;
  z-index: 1;
  width: 260px;
  flex-shrink: 0;
  height: 100vh;
  border-right: 1px solid #353642;
  background-color: #191a28;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    left: -260px;
  }
}

section {
  flex-grow: 1;

  @media screen and (min-width: 769px) {
    padding-left: 260px;
  }
}
</style>
