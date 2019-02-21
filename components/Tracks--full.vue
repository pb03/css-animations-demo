<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <span class="back-button" @click="$emit('gotoArtists')">
        <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFF" d="M24 10.5H5.7l8.4-8.4L12 0 0 12l12 12 2.1-2.1-8.4-8.4H24z"/>
        </svg>
      </span>

      <div class="image-wrapper">
        <img class="header-image" :src="require(`../assets/${artist.image}`)">
      </div>
    </div>

    <div class="tracks">
      <div class="tracks-content">
        <!-- Recent tracks -->
        <div class="recent">
          <div class="recent__track" v-for="track in recentTracks" :key="track.id">
            <img class="recent__image" :src="createUrl(track.image)" width="160" height="160">
            <span class="recent__title">{{ track.title }}</span>
            <span class="recent__duration">{{ getFormattedTime(track.duration) }}</span>
          </div>
        </div>

        <div class="more-tracks">
          <!-- Popular tracks -->
            <div>
              <h2 class="popular__heading">Popular</h2>
              <div>
                <div class="popular__track" v-for="track in recentTracks" :key="track.id">
                  <img class="popular__image" :src="createUrl(track.image)" width="36" height="36">
                  <span>
                    <span class="popular__title">{{ track.title }}</span>
                    <span class="popular__album">{{ track.album }}</span>
                  </span>
                  <span class="popular__duration">{{ getFormattedTime(track.duration) }}</span>
                </div>
              </div>
            </div>
            <!-- Playlists -->
            <div>
              <h2 class="playlist__heading">Playlists</h2>
              <div>
                <div class="playlist__grid">
                  <div class="playlist__item" v-for="playlist in recentTracks" :key="playlist.id">
                    <img class="playlist__image" :src="createUrl(playlist.image)" width="100%" height="90">
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
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
      artistId: Number(this.$route.params.id),
      recentTracks: tracks[this.$route.params.id].recent
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
  },

  methods: {
    createUrl(name) {
      return require(`../assets/tracks/recent/${name}`)
    },

    getFormattedTime(totalSeconds) {
      const min = Math.floor(totalSeconds / 60)
      const sec = totalSeconds - (min * 60)
      return `${min}:${sec}`
    }
  }
}
</script>

<style lang="scss" scoped>
$easing: cubic-bezier(0.19, 1, 0.22, 1);

:root {
  --translate-header-image: none;
}

.tracks {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 276px);
  color: #333;
  transform-origin: left bottom;
  will-change: transform;
  animation: slide-up-tracks 0.8s $easing;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    will-change: transform;
    animation: slide-up-box 1s $easing;
  }
}

@keyframes slide-up-tracks {
  from {
    transform: translateY(calc(100vh - 250px));
  }
}

@keyframes slide-up-box {
  from {
    transform: translateY(250px);
  }
}

.tracks-content {
  position: relative;
  bottom: 80px;
  max-width: 1080px;
  padding-left: 100px;
}

.more-tracks {
  display: grid;
  grid-template-columns: minmax(280px, 3fr) minmax(250px, 2fr);
  grid-column-gap: 80px;
  padding-right: 15px;

  @media screen and (max-width: 985px) {
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
    padding-right: 100px;
  }
}

// Header
.header {
  display: flex;
  align-items: flex-start;
  max-width: 1080px;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 15px;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 36px;
  width: 36px;
  margin-right: 44px;
  border-radius: 50%;
  background-color: #353642;
  cursor: pointer;
  transition: background-color 0.2s;
  animation: fade-in 1s ease;
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
  position: relative;
  flex-shrink: 0;
  margin-right: 30px;
  transform-origin: left top;
  will-change: transform;
  animation: move-image 0.9s $easing;
}

@keyframes move-image {
  from {
    transform: var(--translate-header-image);
  }
}

.header-image {
  width: 240px;
  height: 240px;
  border-radius: 10px;
  object-fit: cover;
  vertical-align: bottom;
}

// Recent
.recent {
  display: grid;
  grid-template-columns: repeat(50, 160px);
  grid-column-gap: 40px;
  margin-bottom: 50px;
  overflow-x: auto;
  overflow-y: hidden;

  @media screen and (max-width: 768px) {
    max-width: calc(100vw - 100px);
  }
}

.recent__track {
  transform: scale(0.65);
  opacity: 0;
  animation: scale-up 1s $easing forwards;

  @for $i from 1 to 6 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.recent__image {
  border-radius: 8px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.35);
}

.recent__title {
  font-weight: 500;
  line-height: 1.4;
}

.recent__duration {
  display: block;
  color: #999;
  font-size: 14px;
  line-height: 1;
}

@keyframes scale-up {
  75% {
    opacity: 1;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

// Popular
.popular__heading {
  margin-bottom: 34px;
}

.popular__track {
  display: grid;
  grid-template-columns: 36px 1fr 50px;
  grid-column-gap: 20px;
  margin-bottom: 15px;
  animation: stagger 1.5s $easing;

  @for $i from 1 to 5 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.popular__image {
  border-radius: 4px;
  margin-top: 4px;
}

.popular__album {
  display: block;
  font-size: 13px;
  color: #999;
  line-height: 1.2;
}

.popular__duration {
  color: #999;
  font-size: 14px;
  align-self: center;
  text-align: right;
}

// Playlists
.playlist__heading {
  margin-bottom: 40px;
}

.playlist__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
}

.playlist__item {
  animation: stagger 1.5s $easing;

  @for $i from 1 to 5 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.playlist__image {
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
  vertical-align: bottom;
}

@keyframes stagger {
  from {
    transform: translateY(120px);
  }
}
</style>
