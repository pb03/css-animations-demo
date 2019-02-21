<template>
  <div class="artists">
    <div class="tiles">
      <div class="tile-wrapper" v-for="artist in artists" :key="artist.id">
        <div :class="artist.id === $route.params.id ? 'tile tile--slide-in' : 'tile'">
          <img class="image" :data-id="artist.id" :src="createUrl(artist.image)" @click="handleClick">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import artists from '../data/artists'

export default {
  name: 'artists',

  data() {
    return {
      artists
    }
  },

  beforeMount() {
    if (!this.$route.params.id) return

    const rootEl = document.documentElement
    const { top, left } = this.$route.params.position
    // padding from left
    const offsetLeft = 100
    // padding from top
    const offsetTop = 30
    const x = -(left - offsetLeft)
    const y = -(top - offsetTop)

    rootEl.style.setProperty('--translate-tile', `translate(${x}px, ${y}px) scale(1.2632)`)
  },

  methods: {
    handleClick(e) {
      const el = e.target
      const artistId = Number(el.dataset.id)
      const { x, y } = el.getBoundingClientRect()
      const position = { left: x, top: y }

      // Transition to the artist page, sending the clicked image info
      this.$emit('gotoTracks', position, artistId)
      // Hide the clicked image
      el.style.opacity = 0
    },

    createUrl(name) {
      return require(`../assets/${name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
$easing: cubic-bezier(0.19, 1, 0.22, 1);

:root {
  --translate-tile: none;
}

.artists {
  padding-top: 50px;
  padding-left: 110px;
  padding-right: 20px;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, 190px);
  grid-column-gap: 40px;
}

.tile-wrapper {
  margin-bottom: 40px;
  cursor: pointer;
}

.tile {
  position: relative;
}

.tile--slide-in {
  animation: tile-move 0.9s $easing;
}

@keyframes tile-move {
  from {
    transform-origin: left top;
    transform: var(--translate-tile);
  }
  to {
    transform-origin: left top;
  }
}

.image {
  width: 190px;
  height: 190px;
  border-radius: 10px;
  vertical-align: bottom;
  object-fit: cover;
}
</style>
