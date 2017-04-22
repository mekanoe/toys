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

      <p>This game isn't actually working, nothing interesting happens.</p>
      <p>TTS vocal tests are on row 10</p>

    </div>

  </div>
</template>

<script>
  import tts, { ttsFactory } from '@/libs/tts'

  function getVoices () {
    return window.speechSynthesis.getVoices().filter(x => x.lang === 'en-US')
  }

  const playerTTS = ttsFactory(getVoices()[0])
  const opponentTTS = ttsFactory(getVoices()[2])

  export default {
    data () {
      return {
        xCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        yCount: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
        hoverX: '',
        hoverY: ''
      }
    },
    methods: {
      cellClick: async function (x, y) {
        await playerTTS(tts.callout(`${y}-${x}`), { postDelay: 2000 })

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
