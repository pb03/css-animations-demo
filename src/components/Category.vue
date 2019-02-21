<template>
  <div class="category">
    <h2 class="title">{{ title }}</h2>
    <div class="tiles">
      <div class="tile-wrapper" v-for="artist in artists" :key="artist.id">
        <div class="tile" :class="{'tile--slide-in': artist.id === $route.params.id}">
          <img
            class="image"
            :data-id="artist.id"
            :src="createUrl(artist.image)"
            width="190"
            height="190"
            @click="handleClick"
          >
          <span class="artist-info">
            <span class="artist-name">{{ artist.name }}</span>
            <span class="artist-category">{{ artist.category }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    artists: Array
  },

  methods: {
    handleClick(e) {
      const el = e.target
      const artistId = Number(el.dataset.id)
      const { x, y } = el.getBoundingClientRect()
      const position = { left: x, top: y }

      // Transition to the artist page, sending the clicked image info
      this.$root.$emit('gotoTracks', position, artistId)
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
:root {
  --translate-tile: none;
}

.category {
  margin-bottom: 10px;
}

.title {
  margin-bottom: 35px;
  font-weight: 700;
  animation: fade-in 0.5s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, 190px);
  grid-column-gap: 40px;
}


.tile-wrapper {
  margin-bottom: 40px;
  cursor: pointer;

  &:first-child .artist-info {
    background-color: #48494b;
  }

  &:nth-child(2) .artist-info {
    background-color: #727ba5;
  }

  &:nth-child(3) .artist-info {
    background-color: #849cb0;
  }

  &:nth-child(4) .artist-info {
    background-color: #9d9ea6;
  }

  &:first-child .tile::before {
    border-color: #48494b;
  }

  &:nth-child(2) .tile::before {
    border-color: #727ba5;
  }

  &:nth-child(3) .tile::before {
    border-color: #849cb0;
  }

  &:nth-child(4) .tile::before {
    border-color: #9d9ea6;
  }
}

.tile {
  position: relative;
  animation: tile-scale-up 1s var(--easing-smooth);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border: 4px solid #565870;
    transition: transform 0.18s;
  }

  &:hover::before {
    transform: scale(1.04, 1.03);
  }
}

@keyframes tile-scale-up {
  from {
    opacity: 0;
    transform: scale(0.75);
  }
}

.tile--slide-in {
  transform-origin: left top;
  will-change: transform;
  animation: tile-move 0.9s var(--easing-smooth);
}

@keyframes tile-move {
  from {
    transform: var(--translate-tile);
  }
}

.image {
  border-radius: 10px 10px 0 0;
  vertical-align: bottom;
  object-fit: cover;
  transition: opacity 0s 0.05s;
}

.artist-info {
  display: block;
  background-color: #c49a93;
  color: #fff;
  line-height: 1;
  border-radius: 0 0 10px 10px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.artist-name {
  display: block;
  font-size: 15px;
  font-weight: 500;
}

.artist-category {
  font-size: 13px;
}
</style>
