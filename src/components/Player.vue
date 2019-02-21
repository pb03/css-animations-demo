<template>
  <div class="player">
    <div class="current-track">
      <img class="current-track-image" src="../assets/tracks/recent/work.jpg" width="32" height="32" alt="">
      <span class="track-name">
        Work
        <span class="artist-name">Rihanna</span>
      </span>
    </div>

    <div class="controls">
      <!-- Previous track button -->
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16">
          <path fill="#fff" d="M14 15V1L4 8zM2 1h2v14H2V1z"/>
        </svg>
      </button>
      <!-- Play/pause button -->
      <button class="play-button" @click="togglePlay">
        <svg width="16" height="20" viewBox="0 0 42 40" xmlns="http://www.w3.org/2000/svg">
          <polygon ref="shape1" fill="#fff" :points="this.buttonShape.play1"/>
          <polygon ref="shape2" fill="#fff" :points="this.buttonShape.play2"/>
        </svg>
      </button>
      <!-- Next track button -->
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16">
          <path fill="#fff" d="M2 1v14l10-7zM12 1h2v14h-2V1z"/>
        </svg>
      </button>
    </div>

    <div class="seek">
      <span class="bar"></span>
    </div>

    <div class="other-controls">
      <!-- Favourite icon -->
      <div class="favourite" :class="{'is-favourite': isFavourite}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510" @click="toggleFavourite">
          <path fill="#636479" d="M255 489.6l-35.7-35.7C86.7 336.6 0 257.55 0 160.65 0 81.6 61.2 20.4 140.25 20.4c43.35 0 86.7 20.4 114.75 53.55C283.05 40.8 326.4 20.4 369.75 20.4 448.8 20.4 510 81.6 510 160.65c0 96.9-86.7 175.95-219.3 293.25L255 489.6z"/>
        </svg>
        <span class="small-hearts">
          <i></i> <i></i>  <i></i> <i></i>  <i></i> <i></i>
        </span>
      </div>
      <!-- Volume icon -->
      <svg class="volume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" @click="changeVolume">
        <g fill="#dadadd" :class="`level-${volumeLevel}`">
          <path d="M37.992 22.752l-3.084 3.083A8.648 8.648 0 0 1 37.48 32c0 2.411-.984 4.593-2.572 6.165l3.084 3.083A13.047 13.047 0 0 0 41.82 32c0-3.611-1.463-6.88-3.828-9.248z"/>
          <path d="M50.496 32c0-6.005-2.44-11.441-6.383-15.369l-3.053 3.053A17.371 17.371 0 0 1 46.158 32c0 4.809-1.949 9.162-5.098 12.316l3.053 3.053A21.628 21.628 0 0 0 50.496 32z"/>
          <path d="M59.174 32c0-8.402-3.413-16.006-8.926-21.505l-3.068 3.068A25.95 25.95 0 0 1 54.835 32a25.95 25.95 0 0 1-7.655 18.437l3.068 3.068c5.513-5.498 8.926-13.103 8.926-21.505z"/>
          <polygon points="21.085 66 44 87.208 44 12.791 21.517 34 0 34 0 66" transform="matrix(.5754 0 0 .5754 3.343 3.23)"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFavourite: false,
      volumeLevel: 2,
      isPlaying: false,
      buttonShape: {
        play1: [0, 0, 0, 40, 18.032, 29.982, 17.971, 9.984],
        play2: [18.032, 29.982, 35.823, 20.099, 36, 20, 17.971, 9.984],
        pause1: [0, 0, 0, 40, 11, 40, 11, 0],
        pause2: [21, 40, 32, 40, 32, 0, 21, 0]
      }
    }
  },

  methods: {
    togglePlay() {
      const shapes = this.buttonShape

      const getProgress = ({elapsed, total}) =>
        Math.min(elapsed / total, 1)

      const time = {
        start: performance.now(),
        total: 150
      }

      const morph = now => {
        time.elapsed = now - time.start

        const getPoints = (from, to) => from.map((start, index) => {
          const end = to[index]
          const distance = end - start
          const point = start + getProgress(time) * distance
          return point
        })

        const points1 = this.isPlaying
          ? getPoints(shapes.play1, shapes.pause1)
          : getPoints(shapes.pause1, shapes.play1)
        const points2 = this.isPlaying
          ? getPoints(shapes.play2, shapes.pause2)
          : getPoints(shapes.pause2, shapes.play2)

        this.$refs.shape1.setAttribute('points', points1.join(' '))
        this.$refs.shape2.setAttribute('points', points2.join(' '))

        if (getProgress(time) < 1) requestAnimationFrame(morph)
      }

      requestAnimationFrame(morph)
      this.isPlaying = !this.isPlaying
    },

    changeVolume() {
      this.volumeLevel = this.volumeLevel === 3 ? 0 : this.volumeLevel + 1
    },

    toggleFavourite() {
      this.isFavourite = !this.isFavourite
    }
  }
}
</script>


<style lang="scss" scoped>
.player {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  display: grid;
  align-content: center;
  grid-template-columns: 260px 120px 1fr 150px;
  height: 60px;
  width: 100%;
  background-color: #3b3c4b;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: transparent;
  border: 0;
  outline: none;

  &:not(.play-button) {
    cursor: not-allowed;
  }
}

.play-button {
  background-color: var(--red);
  width: 38px;
  height: 38px;
  display: flex;
  padding-left: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 3px 13px 0px rgba(234, 68, 90, 0.65);
  transition: box-shadow 0.15s, transform 0.1s;

  &:hover {
    box-shadow: 0 3px 19px 2px rgba(234, 68, 90, 0.65);
  }

  &:active {
    box-shadow: 0 3px 10px 0px rgba(234, 68, 90, 0.65);
    transform: scale(0.96);
  }
}

.seek {
  padding: 20px 40px;
}

.bar {
  position: relative;
  display: block;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.3);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 70%;
    border-radius: 2px;
    background-color: #fff;
  }

  &::after {
    content: '';
    position: absolute;
    left: 69%;
    top: -3px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
  }
}

.favourite {
  position: relative;
  width: 18px;
  height: 18px;
  margin-right: 15px;

  path {
    transition: fill 0.2s;
  }

  &.is-favourite {
    svg {
      animation: bounce 0.6s linear;
    }

    path {
      fill: var(--red);
    }
  }
}

@keyframes bounce {
  0%, 100% {
    transform: none;
  }
  30% {
    transform: scale(1.3);
  }
  60% {
    transform: scale(0.9);
  }
}

.small-hearts {
  position: absolute;
  width: 150px;
  left: 20px;
  bottom: 35px;

  i {
    position: absolute;
    opacity: 0;
    background-image: url('../assets/icons/heart.svg');

    .is-favourite & {
      animation: float-upwards 0.35s linear;
    }

    &:first-child {
      left: -25px;
      top: -15px;
      width: 10px;
      height: 10px;
      animation-delay: 0.05s;
    }

    &:nth-child(2) {
      left: 5px;
      top: -5px;
      width: 10px;
      height: 10px;
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      left: -25px;
      top: -30px;
      width: 8px;
      height: 8px;
      animation-delay: 0.15s;
    }

    &:nth-child(4) {
      width: 6px;
      height: 6px;
      left: -40px;
      animation-delay: 0.2s;
    }

    &:nth-child(5) {
      left: -10px;
      top: -10px;
      width: 6px;
      height: 6px;
      animation-delay: 0.25s;
    }

    &:nth-child(6) {
      top: -25px;
      width: 4px;
      height: 4px;
      animation-delay: 0.3s;
    }
  }
}

@keyframes float-upwards {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  50%, 100% {
    transform: translate(-1px, -5px);
  }
}

.other-controls {
  display: flex;
  align-items: center;
}

.volume {
  height: 34px;
  width: 34px;
  border-radius: 6px;
  padding: 5px;

  path {
    opacity: 0;
    transform: translateX(-5px) scale(0.6);
    transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
  }

  .level-1 path:first-child,
  .level-2 path:first-child,
  .level-2 path:nth-child(2),
  .level-3 path {
    transform: none;
    opacity: 1;
  }
}

.current-track {
  display: flex;
  align-items: center;
  padding-left: 50px;
}

.current-track-image {
  margin-right: 15px;
  border-radius: 50%;
}

.track-name {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
}

.artist-name {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
