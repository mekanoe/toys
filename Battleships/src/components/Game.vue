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
  function getVoices () {
    return window.speechSynthesis.getVoices().filter(x => x.lang === 'en-US')
  }

  function playerSay (text) {
    return new Promise((resolve, reject) => {
      const u = new SpeechSynthesisUtterance(text)
      u.voice = getVoices()[0]
      speechSynthesis.speak(u)
      setTimeout(() => { resolve() }, 2500)
    })
  }

  function opponentHitmiss (hitmiss) {
    return new Promise((resolve, reject) => {
      let text = 'Miss.'

      console.log(hitmiss)

      if (hitmiss % 2) {
        console.log('it')
        text = 'Hit.'
      }

      const u = new SpeechSynthesisUtterance(text)
      u.voice = getVoices()[2]
      speechSynthesis.speak(u)
      setTimeout(() => { resolve() }, 1500)
    })
  }

  function opponentSunk (which) {
    return new Promise((resolve, reject) => {
      const u = new SpeechSynthesisUtterance(`You've sunk my ${which}.`)
      u.voice = getVoices()[2]
      speechSynthesis.speak(u)
      setTimeout(() => { resolve() }, 5000)
    })
  }

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
        // Speech test
        await playerSay(`${y}-${x}`)
        await opponentHitmiss(Math.floor(Math.random() * 10))

        if (x === 10) {
          switch (y) {
            case 'A':
              await opponentSunk('Battleship')
              break
            case 'B':
              await opponentSunk('PT Boat')
              break
            case 'C':
              await opponentSunk('Carrier')
              break
            case 'D':
              await opponentSunk('Submarine')
              break
            case 'E':
              await opponentSunk('Destroyer')
              break
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
