<template>
  <div class="recent">
    <div class="track" v-for="track in tracks" :key="track.id">
      <img class="image" :src="createUrl(track.image)" width="160" height="160">
      <span class="title">{{ track.title }}</span>
      <span class="duration">{{ getFormattedTime(track.duration) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tracks: Array
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

.track {
  transform: scale(0.65);
  opacity: 0;
  animation: scale-up 1s var(--easing-smooth) forwards;

  @for $i from 1 to 6 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.image {
  border-radius: 8px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.35);
}

.title {
  font-weight: 500;
  line-height: 1.4;
}

.duration {
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
</style>
