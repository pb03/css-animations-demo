<template>
  <div class="container">
    <ArtistHeader :artist="artist" />

    <div class="tracks">
      <div class="tracks-content">
        <Recent :tracks="recentTracks" />
        <div class="more-tracks">
          <Popular :tracks="recentTracks" />
          <Playlists :playlists="recentTracks" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ArtistHeader from './ArtistHeader.vue'
import Recent from './Recent.vue'
import Popular from './Popular.vue'
import Playlists from './Playlists.vue'
import tracks from '../data/tracks'
import artists from '../data/artists'

export default {
  name: 'tracks',

  components: {
    ArtistHeader,
    Recent,
    Popular,
    Playlists
  },

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
  }
}
</script>

<style lang="scss" scoped>
:root {
  --translate-header-image: none;
}

.container {
  @media screen and (min-width: 769px) {
    width: calc(100vw - 260px);
  }

  &.main-leave-active {
    position: absolute;
    top: 0;
    z-index: 1;
  }
}

.tracks {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 276px);
  color: #333;
  transform-origin: left bottom;
  transition: transform 0.8s var(--easing-smooth);
  will-change: transform;

  .main-enter & {
    transform: translateY(calc(100vh - 250px));
  }

  .main-leave-active & {
    transform: translateY(calc(100vh - 150px));
    transition: transform 1s var(--easing-smooth);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    transition: transform 1s var(--easing-smooth);
    will-change: transform;

    .main-enter & {
      transform: translateY(250px);
    }
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
</style>
