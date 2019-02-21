<template>
  <div class="header">
    <span class="back-button" @click="$emit('gotoArtists')">
      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFF" d="M24 10.5H5.7l8.4-8.4L12 0 0 12l12 12 2.1-2.1-8.4-8.4H24z"/>
      </svg>
    </span>

    <div class="image-wrapper">
      <img class="image" :src="require(`../assets/${artist.image}`)">
    </div>
  </div>
</template>

<script>
import tracks from '../data/tracks'
import artists from '../data/artists'

export default {
  name: 'tracks',

  data() {
    return {
      artistId: Number(this.$route.params.id)
    }
  },

  computed: {
    artist: function() {
      return artists.find(a => this.artistId === a.id)
    }
  },

  beforeMount() {
    const rootEl = document.documentElement
    const { left, top } = this.$route.params.position
    // sidebar width + left padding = 360
    const offsetLeft = 100
    // padding from top
    const offsetTop = 30
    const x = left - offsetLeft
    const y = top - offsetTop

    scroll(0, 0)
    rootEl.style.setProperty('--translate-header-image', `translate(${x}px, ${y}px) scale(0.792)`)
  }
}
</script>

<style lang="scss" scoped>
:root {
  --translate-header-image: none;
}

.header {
  display: flex;
  align-items: flex-start;
  padding-top: 30px;
  padding-left: 20px;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  margin-right: 44px;
  border-radius: 50%;
  background-color: #353642;
  cursor: pointer;
}

.name {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
}

.category {
  font-size: 18px;
  font-weight: 400;
  color: #b2b3c1;
}

.image-wrapper {
  flex-shrink: 0;
  margin-right: 30px;
  transform-origin: left top;
  animation: move-image 0.6s;
}

@keyframes move-image {
  from {
    transform: var(--translate-header-image);
  }
}

.image {
  width: 240px;
  height: 240px;
  border-radius: 10px;
  object-fit: cover;
  vertical-align: bottom;
}
</style>
