<template>
  <div class="header">
    <!-- Back button -->
    <span class="back-button" @click="$root.$emit('gotoArtists')">
      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFF" d="M24 10.5H5.7l8.4-8.4L12 0 0 12l12 12 2.1-2.1-8.4-8.4H24z"/>
      </svg>
    </span>

    <!-- Artist image -->
    <div class="image-wrapper">
      <img class="image" :src="require(`../assets/${artist.image}`)" width="240" height="240">
    </div>

    <!-- Artist info -->
    <div>
      <h2 class="name">{{artist.name}}</h2>
      <h3 class="category">{{artist.category}}</h3>
    </div>

    <!-- Play/shuffle buttons -->
    <span class="actions">
      <span class="shuffle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
          <path fill="#fff" d="M512 387.67L405.406 281.024v84.694h-10.435c-68.152 0-102.461-56.146-142.191-121.157-40.72-66.633-86.875-142.158-179.637-142.158H0v43.886h73.143c68.152 0 102.461 56.146 142.191 121.157 40.72 66.633 86.875 142.158 179.637 142.158h10.435v84.686L512 387.67z"/><path fill="#fff" d="M512 124.355L405.406 17.71v84.695h-10.435c-66.714 0-109.319 39.063-143.135 85.788 9.055 13.584 17.433 27.249 25.391 40.268 31.024-46.945 63.77-82.172 117.744-82.172h10.435v84.686L512 124.355zM190.887 283.548c-31.024 46.943-63.77 82.17-117.744 82.17H0v43.886h73.143c66.714 0 109.319-39.063 143.135-85.788-9.056-13.584-17.433-27.249-25.391-40.268z"/>
        </svg>
      </span>
      <span class="play">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="13" height="13">
          <path fill="#fff" d="M36.068 20.176l-29-20A1 1 0 1 0 5.5.999v40a1 1 0 0 0 1.568.823l29-20a.999.999 0 0 0 0-1.646z"/>
        </svg>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    artist: Object
  },

  beforeMount() {
    const rootEl = document.documentElement
    const { left, top } = this.$route.params.position
    // sidebar width + left padding = 360
    const offsetLeft = window.innerWidth > 768 ? 360 : 100
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
.header {
  display: flex;
  align-items: flex-start;
  max-width: 1080px;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 15px;
  transition: opacity 0s 0.05s;

  .main-leave-active & {
    opacity: 0;
  }
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

  &:hover {
    background-color: #424351;
  }
}

.name {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  animation: slide-right 0.9s var(--easing-smooth);
}

.category {
  font-size: 18px;
  font-weight: 400;
  color: #b2b3c1;
  animation: slide-right 1.1s var(--easing-smooth);
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
}

.image-wrapper {
  position: relative;
  flex-shrink: 0;
  margin-right: 30px;
  transform-origin: left top;
  will-change: transform;
  animation: move-image 0.9s var(--easing-smooth);

  &::after {
    content: '';
    height: 130px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, #191a28);
    animation: fade-in 0.5s ease forwards;
  }
}

@keyframes move-image {
  from {
    transform: var(--translate-header-image);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.image {
  border-radius: 10px;
  object-fit: cover;
  vertical-align: bottom;
}

.actions {
  flex-grow: 1;
  text-align: right;
  margin-top: 5px;
  animation: fade-in 1s ease;
}

.shuffle,
.play {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  margin-left: 10px;
  border-radius: 50%;
  cursor: not-allowed;
}

.shuffle {
  margin-bottom: 10px;
  background-color: #353642;
}

.play {
  background-color: var(--red);
}
</style>
