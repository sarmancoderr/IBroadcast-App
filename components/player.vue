<template>
  <v-row>
    <v-col :style="{padding: '0px'}" class="p-0" md="3" lg="2">
      <v-card v-if="songInfo" :style="`position: fixed; bottom: 0px; left: 0px; width: ${widthAlbumCardContainer}`">
        <template v-if="maximized">
          <v-card-title class="primary darken-1 white--text" style="padding: 2px 10px">
            {{ songInfo.title }}
            <v-spacer />
            <v-btn icon dark @click="maximized = false">
              <v-icon>
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-img v-if="songInfo" :src="songInfo.artwork" />
        </template>
        <v-card-text style="padding: 9px 0px">
          <v-list dense style="padding: 0px">
            <v-list-item style="padding: 0px">
              <v-hover v-slot="{hover}">
                <v-list-item-avatar v-if="!maximized" tile style="margin-left: 10px" size="75px">
                  <v-img :src="songInfo.artwork" />
                  <v-overlay v-if="hover" absolute>
                    <v-btn icon dark elevation="0" small @click="maximized = true">
                      <v-icon>
                        mdi-chevron-up
                      </v-icon>
                    </v-btn>
                  </v-overlay>
                </v-list-item-avatar>
              </v-hover>
              <v-list-item-content style="padding: 0px">
                <v-list v-if="songInfo" dense style="padding: 9px 0px 0px 0px">
                  <v-list-item v-if="!maximized">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ songInfo.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="maximized">
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ songInfo.artist.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        :style="styleItemSubtitle"
                        :title="songInfo.album.name"
                      >
                        {{ songInfo.album.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="p-0" :style="{padding: '0px', alignSelf: 'flex-end'}">
      <v-card :style="`position: fixed; bottom: 0px; left: ${widthAlbumCardContainer}; right: 0px`" elevation="0">
        <v-card-text>
          <div :style="{display: 'flex', padding: '0px 10px'}">
            <span>{{ timePlayed }}</span>
            <v-slider
              :style="{margin: '0px 25px'}"
              :min="0"
              :max="totalSongDuration"
              :value="currentTime"
              :height="25"
              @change="updateTime"
            />
            <span>{{ timeLeft }}</span>
          </div>
          <div :style="{display: 'flex', justifyContent: 'center'}">
            <v-btn icon @click="$store.commit('queue/backSong')">
              <v-icon>
                mdi-arrow-left-circle-outline
              </v-icon>
            </v-btn>
            <v-btn v-if="playing" icon @click="pause">
              <v-icon>
                mdi-pause-circle-outline
              </v-icon>
            </v-btn>
            <v-btn v-else icon @click="play">
              <v-icon>
                mdi-play-circle-outline
              </v-icon>
            </v-btn>
            <v-btn icon @click="$store.commit('queue/nextSong')">
              <v-icon>
                mdi-arrow-right-circle-outline
              </v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <audio id="audioPlayer" ref="player" :style="{display: 'none'}" controls />
  </v-row>
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

function formatDuration (seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const leftSeconds = Math.floor((seconds - minutes * 60)).toString().padStart(2, '0')
  return `${minutes}:${leftSeconds}`
}

export default {
  name: 'CustomPlayer',
  data () {
    return {
      totalSongDuration: 0,
      currentTime: 0,
      maximized: false,
      widthAlbum: 300,
      widthTileArtwork: 75
    }
  },
  computed: {
    ...mapGetters({
      audioUrl: 'queue/activeSongUrl',
      songInfo: 'queue/activeSongInfo'
    }),
    widthAlbumCardContainer () {
      return (this.maximized ? this.widthAlbum : this.widthAlbum + this.widthTileArtwork) + 'px'
    },
    styleItemSubtitle () {
      return {
        '-webkit-line-clamp': 2,
        'word-break': 'break-word',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        'white-space': 'initial'
      }
    },
    playing: {
      get () {
        return this.$store.state.queue.playing
      },
      set (val) {
        this.$store.commit('queue/playing', val)
      }
    },
    timePlayed () {
      const duration = formatDuration(this.currentTime)
      return duration
    },
    timeLeft () {
      const duration = formatDuration(this.totalSongDuration - this.currentTime)
      return duration
    }
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
      nextSong: 'queue/nextSong',
      backSong: 'queue/backSong'
    }),
    updateTime (timeChoosen) {
      this.$refs.player.currentTime = timeChoosen
    },
    pause () {
      /**
       * @type {HTMLAudioElement}
       */
      const el = this.$refs.player
      el.pause()
      this.playing = false
    },
    play () {
      /**
       * @type {HTMLAudioElement}
       */
      const el = this.$refs.player
      el.play()
      this.playing = true
    },
    managePlay ({ type, payload }, st) {
      /**
       * @type {HTMLAudioElement}
       */
      const el = this.$refs.player
      if (type === 'queue/playAlbum') {
        this.nextSong()
        this.playing = true
      }
      if (type === 'queue/nextSong' || type === 'queue/backSong') {
        el.src = this.audioUrl
        el.play()
      }
    }
  }
}
</script>
