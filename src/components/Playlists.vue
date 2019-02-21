<template>
  <div>
    <h2 class="heading">Playlists</h2>
    <div>
      <div class="grid">
        <div class="item" v-for="playlist in playlists" :key="playlist.id">
          <img class="image" :src="createUrl(playlist.image)" width="100%" height="90">
          <span class="title">{{ playlist.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlists: Array
  },

  methods: {
    createUrl(name) {
      return require(`../assets/tracks/recent/${name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
}

.item {
  position: relative;
  animation: stagger 1.5s var(--easing-smooth);

  @for $i from 1 to 5 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.image {
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
  vertical-align: bottom;
}

.title {
  position: absolute;
  left: 15px;
  bottom: 10px;
  color: #fff;
  font-weight: 500;
}

@keyframes stagger {
  from {
    transform: translateY(140px);
  }
}
</style>


