<template>
  <div id="game">

    <div class="stage">

      <table @mouseout="removeHover">
        <tbody>
          <tr>
            <td class="empty"></td>
            <th class="y-head" :class="(hoverY === y) ? 'head-hover' : ''" :data-head="y" v-for="y in yCount">{{y}}</th>
          </tr>
          <tr v-for="x in xCount">
            <th class="x-head" :class="(hoverX === ''+x) ? 'head-hover' : ''" :data-head="x">{{x}}</th>
            <td class="cell" v-for="y in yCount" :data-cell="y+x" @click="cellClick(x, y)" @mouseover="cellHover(y+x, $event)"></td>
          </tr>
        </tbody>
      </table>

      <!-- DEBUG -->
      <div class="debug" v-if="debug">
        <select @change="debugStateEvent" v-model="game_state">
          <option value="GAME_NOSTATE">GAME_NOSTATE</option>
          <option value="GAME_PLACING">GAME_PLACING</option>
          <option value="GAME_WAITING">GAME_WAITING</option>
          <option value="GAME_PLAYING">GAME_PLAYING</option>
        </select>
      </div>

    </div>

  </div>
</template>

<script>
  import tts, { ttsFactory } from '@/libs/tts'
  import Game from '@/libs/game'

  function getVoices () {
    return window.speechSynthesis.getVoices().filter(x => x.lang === 'en-US')
  }

  let playerTTS = ttsFactory(getVoices()[0])
  let opponentTTS = ttsFactory(getVoices()[2])

  speechSynthesis.onvoiceschanged = () => {
    playerTTS = ttsFactory(getVoices()[0])
    opponentTTS = ttsFactory(getVoices()[2])
  }

  const GAME_NOSTATE = 'GAME_NOSTATE'
  const GAME_PLACING = 'GAME_PLACING'
  const GAME_WAITING = 'GAME_WAITING'
  const GAME_PLAYING = 'GAME_PLAYING'

  const GAME_AI_DEBUG = 'GAME_AI_DEBUG'

  const game = new Game()
  window.$game = game

  export default {
    data () {
      return {
        xCount: game.xAxis,
        yCount: game.yAxis,
        hoverX: '',
        hoverY: '',

        map: game.playerMap,

        game_state: GAME_PLACING,

        debug: process.env.NODE_ENV === 'development'
      }
    },
    methods: {
      cellClick: async function (x, y) {
        switch (this.game_state) {
          case GAME_NOSTATE:
            this.ttsTest(x, y)
            break
          case GAME_PLACING:
            this.place(x, y)
            break
          case GAME_PLAYING:
            this.play(x, y)
            break
          case GAME_WAITING:
            break
        }
      },
      ttsTest: async function (x, y) {
        await playerTTS(tts.callout(x, y), { postDelay: 2000 })

        let result = tts.hit
        if (Math.floor(Math.random() * 2) === 0) {
          result = tts.miss
        }

        await opponentTTS(result, { postDelay: 1500 })

        if (+x === 10) {
          console.log('triggered tts test')
          switch (y) {
            case 'A': opponentTTS(tts.sunk_carrier); break
            case 'B': opponentTTS(tts.sunk_battleship); break
            case 'C': opponentTTS(tts.sunk_pt_boat); break
            case 'D': opponentTTS(tts.sunk_destroyer); break
            case 'E': opponentTTS(tts.sunk_submarine); break
            case 'F': playerTTS(tts.lost_carrier); break
            case 'G': playerTTS(tts.lost_battleship); break
            case 'H': playerTTS(tts.lost_pt_boat); break
            case 'J': playerTTS(tts.lost_destroyer); break
            case 'K': playerTTS(tts.lost_submarine); break
          }
        }
      },
      cellHover (cell) {
        this.hoverX = cell.slice(1)
        this.hoverY = cell[0]
        console.log(this.hoverX, this.hoverY)
      },
      removeHover () {
        this.hoverX = ''
        this.hoverY = ''
      },

      debugStateEvent () {},
      debugDispatch ({action, data = null}) {
        if (process.env !== 'development') {
          return
        }

        switch (action) {

          case 'tts':
            this.ttsTest(data.x, data.y)
            break

          case 'state':
            this.game_state = data
            break

          case 'show-opponent':
            this.toggleAIDebug(GAME_AI_DEBUG)
            break

          case 'skip':
            this.skipTurn()
            break

        }
      }
    }
  }
</script>

<style lang="sass" scoped>
@import "../sass/variables.sass"

.stage
  margin: 0 auto
  width: calc(3em*12)
  color: $light

table, th, td
  border: 1px solid $mid
  border-collapse: collapse
  text-align: center
  vertical-align: center

th, td
  width: 3em
  height: 3em

.empty, .x-head, .y-head
  border-color: $mid
  background-color: $mid-dark


.head-hover
  background-color: $mid-light
  color: $mid-dark

.cell:hover
  background-color: rgba($mid-light, 0.4)
  color: $mid-dark


</style>
