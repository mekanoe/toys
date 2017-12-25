<template>
<div>
  <div class="score" ref="score">Score: {{humanScore}} / 100</div>
  <transition name="fade">
    <div class="char" ref="char" key="activeChar">
      {{activeChar.kana}}
    </div>
  </transition>
  <div>
    <input type="text" autofocus="true" ref="input" :class="`v-${visualState}`" @blur="giveFocus" :disabled="freeze" v-model="input">
  </div>
  <div class="button" ref="idk" @mousedown="giveUp">I don't know</div>
  <div class="gameOver" :class="(gameOver) ? 'gameOver-visible' : ''">
    <div class="content">
      <h2>Game Over!</h2>
      <h1 v-if="humanScore === 100">S</h1>
      <h1 v-if="humanScore < 100 && humanScore > 90">A</h1>
      <h1 v-if="humanScore <= 90 && humanScore > 80">B</h1>
      <h1 v-if="humanScore <= 80 && humanScore > 70">C</h1>
      <h1 v-if="humanScore <= 70 && humanScore > 60">D</h1>
      <h1 v-if="humanScore <= 60 && humanScore > 50">D</h1>
      <h1 v-if="humanScore <= 50">F</h1>
      <p><b>Score: {{humanScore}} / 100</b></p>
      <p class="button-item"><router-link :to="{name: 'Start'}" class="button">Back to Main Menu</router-link></p>
    </div>
  </div>
</div>
</template>

<script>
  import dictionary from '@/dictionary'

  export default {
    data () {
      return {
        input: '',

        gameOver: false,
        score: 0,
        humanScore: 0,
        maxScore: 0,

        visualState: 'normal',
        freeze: false,

        allChars: dictionary.hiragana,

        availableChars: [],

        activeChar: {
          kana: '',
          romaji: ['']
        },
        activeTries: 3
      }
    },

    watch: {
      input () {
        this.checkInput()
      }
    },

    mounted () {
      this.availableChars = this.allChars
      console.log('%c~~ AVAILABLE CHARS ~~\n', 'font-weight: bold; color: pink', this.availableChars.map(x => x.kana).join(' '))
      this.initScore()
      this.next()

      window.onfocus = () => {
        this.giveFocus()
      }
    },

    methods: {
      checkInput () {
        const input = this.input.toLowerCase()
        if (this.activeChar.romaji.indexOf(input) !== -1) {
          this.triggerChange()
          return
        }

        if (input !== 'n' && this.allChars.filter(x => x.romaji.indexOf(input) !== -1).length !== 0) {
          this.activeTries -= 1
          this.scoreChange({ type: 'wrong_match' })
          if (this.activeTries === 0) {
            this.triggerChange(false)
          }
        }
      },

      next () {
        this.availableChars = this.availableChars.filter(x => x.kana !== this.activeChar.kana)
        if (this.availableChars.length === 0) {
          this.gameEnd()
          return
        }

        const nextChar = this.availableChars[Math.floor(Math.random() * this.availableChars.length)]
        this.activeChar = nextChar
        this.activeTries = 3

        console.log('%c~~ CHAR CHANGE ~~\n', 'font-weight: bold; color: orange', `- New char: ${nextChar.kana}\n - Chars left:`, this.availableChars.map(x => x.kana).join(' '))
      },

      triggerChange (pass = true) {
        console.log('%c~~ GAME CHANGE ~~\n', 'font-weight: bold; color: purple', `- Passed? ${pass}`)

        if (pass) {
          this.visualState = 'pass'
        } else {
          this.visualState = 'fail'
        }

        this.freeze = true

        setTimeout(() => {
          this.input = ''
          this.freeze = false
          this.visualState = 'normal'
          this.next()
          this.giveFocus()
        }, 2000)
      },

      giveUp () {
        if (!this.freeze) {
          this.scoreChange({ type: 'give_up' })
          this.triggerChange(false)
        }
      },

      initScore () {
        // Score is availablechars.length * 3, humanized is percentage ceil.
        this.maxScore = this.availableChars.length * 3
        this.score = this.maxScore
        this.humanScore = 100

        console.log(`%c~~ SCORE INFO ~~`, 'font-weight: bold; color: blue', `\n - Max Score: ${this.maxScore}`)
      },

      scoreChange ({ type }) {
        const oldScore = this.score

        const calcHumanScore = () => {
          return Math.min(Math.ceil(this.score / this.maxScore * 100), 100)
        }

        switch (type) {
          case 'give_up':
            this.score = this.score - 3
            break
          case 'wrong_match':
            this.score = this.score - 1
            break
        }

        this.humanScore = calcHumanScore()
        console.log(`%c** SCORE CHANGE **`, 'font-weight: bold; color: green', `\n - Type: ${type} \n - Old Score: ${oldScore} \n - New Score: ${this.score}`)
      },

      gameEnd () {
        console.log('%c## Game Over ##', 'font-weight: bold; color: red')
        this.freeze = true
        this.gameOver = true
      },

      giveFocus () {
        if (!this.gameOver) {
          setTimeout(() => { this.$refs.input.focus() }, 0)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .char
    font-size: 10em
    text-shadow: 0 0 6px #2a1b22 - #111

  .button
    background-color: #2a1b22 + #111
    box-shadow: 0 0 4px #2a1b22 - #111
    padding: 1em
    margin: 1em 0
    text-decoration: none
    color: #efefef
    cursor: pointer

  input
    appearance: none
    border: 0
    margin: 0
    padding: 0.9em
    font-size: 1em
    color: #fff
    text-align: center
    border-bottom: 3px solid #2a1b22 + #222
    background-color: rgba(#2a1b22 + #111,0.75)
    box-shadow: 0 0 4px #2a1b22 - #111
    transition: all 0.3s ease-in-out
    &:focus
      outline: 0

    &.v-pass
      box-shadow: 0 0 4px #2a1b22 - #111 + #0a0
    &.v-fail
      box-shadow: 0 0 4px #2a1b22 - #111 + #a00

  .gameOver
    transition: opacity 0.5s ease-in
    opacity: 0
    display: none
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: rgba(#000,0.9)

    &.gameOver-visible
      display: block
      opacity: 1

    .content
      position: absolute
      left: 0
      right: 0
      top: 5%

      h1
        font-size: 10em
        margin: 1rem

      p.button-item
        margin-top: 2.5em

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0

</style>
