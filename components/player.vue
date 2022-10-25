<template>
  <v-card width="100%" elevation="0" color="transparent">
    <v-slider :min="0" :max="totalSongDuration" :value="currentTime" :height="25" @change="updateTime" />
    <v-card-title>
      Nombre canción
    </v-card-title>
    <v-card-text>
      <v-btn dark>
        <v-icon dark right>
          mdi-play
        </v-icon>
      </v-btn>
    </v-card-text>
    <audio id="audioPlayer" ref="player" :style="{display: 'none'}" controls />
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
/**
// -> https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
/// properties
currentTime -> segundo por lo que va reproduciendose
duration -> segundos totales de aaaala reproducion
/// events
durationchage -> duration property has updated
timeupdate -> Fired when the time indicated by the currentTime property has been updated.
*/

export default {
  name: 'CustomPlayer',
  data () {
    return {
      totalSongDuration: 0,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters({
      audioUrl: 'queue/activeSongUrl'
    })
  },
  mounted () {
    /**
     * @type {HTMLAudioElement}
     */
    const el = this.$refs.player

    el.onended = () => {
      this.nextSong()
    }

    el.ontimeupdate = () => {
      this.currentTime = el.currentTime
    }
    el.ondurationchange = () => {
      this.totalSongDuration = el.duration
    }

    this.$store.subscribe(this.managePlay)
  },
  beforeDestroy () {
    /**
     * @type {HTMLAudioElement}
     */
    const el = this.$refs.player

    el.onended = null
    el.ontimeupdate = null
    el.ondurationchange = null

    // this.$store.sub (this.managePlay)
  },
  methods: {
    ...mapMutations({
      nextSong: 'queue/nextSong'
    }),
    updateTime (timeChoosen) {
      this.$refs.player.currentTime = timeChoosen
    },
    managePlay ({ type, payload }, st) {
      /**
       * @type {HTMLAudioElement}
       */
      const el = this.$refs.player
      if (type === 'queue/playAlbum') {
        console.log('setting next sonaag')
        this.nextSong()
      }
      if (type === 'queue/nextSong') {
        console.log('setting audiourl and playing')
        el.src = this.audioUrl
        el.play()
      }
    }
  }
}
</script>
