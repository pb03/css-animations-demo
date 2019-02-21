<template>
  <div>
    <h2 class="heading">Popular</h2>
    <div>
      <div class="track" v-for="track in tracks" :key="track.id">
        <img class="image" :src="createUrl(track.image)" width="36" height="36">
        <span>
          <span class="title">{{ track.title }}</span>
          <span class="album">{{ track.album }}</span>
        </span>
        <span class="duration">{{ formatTime(track.duration) }}</span>
      </div>
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

    formatTime(totalSeconds) {
      const min = Math.floor(totalSeconds / 60)
      const sec = totalSeconds - (min * 60)
      return `${min}:${sec}`
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 34px;
}

.track {
  display: grid;
  grid-template-columns: 36px 1fr 50px;
  grid-column-gap: 20px;
  margin-bottom: 15px;
  animation: stagger 1.5s var(--easing-smooth);

  @for $i from 1 to 5 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.image {
  border-radius: 4px;
  margin-top: 4px;
}

.album {
  display: block;
  font-size: 13px;
  color: #999;
  line-height: 1.2;
}

.duration {
  color: #999;
  font-size: 14px;
  align-self: center;
  text-align: right;
}

@keyframes stagger {
  from {
    transform: translateY(140px);
  }
}
</style>
