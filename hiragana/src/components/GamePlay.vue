<template>
<div>

  <transition name="fade">
    <div class="char">
      {{activeChar.kana}}
    </div>
  </transition>
  <div>
    <input type="text" autofocus="true" ref="input" :class="`v-${visualState}`" @blur="giveFocus" v-model="input">
  </div>
  <div class="button" @input="giveUp">I don't know</div>

</div>
</template>

<script>
  export default {
    data () {
      return {
        input: '',
        visualState: 'normal',
        chars: [
          {kana: 'え', romaji: 'e'},
          {kana: 'い', romaji: 'i'},
          {kana: 'け', romaji: 'ke'},
          {kana: 'あ', romaji: 'a'},
          {kana: 'う', romaji: 'u'},
          {kana: 'き', romaji: 'ki'},
          {kana: 'こ', romaji: 'ko'},
          {kana: 'お', romaji: 'o'},
          {kana: 'か', romaji: 'ka'},
          {kana: 'く', romaji: 'ku'}
        ],
        freeze: false,
        activeChar: {
          kana: 'あ',
          romaji: 'a'
        }
      }
    },

    watch: {
      input () {
        this.checkInput()
      }
    },

    methods: {
      checkInput () {
        console.log(`checking input; have '${this.input}', looking for '${this.activeChar.romaji}' (${this.activeChar.kana})`)
        if (this.input === this.activeChar.romaji) {
          this.triggerChange()
        }

        console.log(this.$refs)
      },

      next () {
        const current = this.activeChar
        const nextChar = this.chars[Math.floor(Math.random() * this.chars.length)]
        if (current.kana === nextChar.kana) {
          return this.next()
        }

        this.activeChar = nextChar
      },

      triggerChange (pass = true) {
        console.log('triggered change; pass? => ', pass)
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
        this.triggerChange(false)
      },

      giveFocus () {
        this.$refs.input.focus()
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
    margin: 0.5em
    text-decoration: none
    color: #efefef

  input
    appearance: none
    border: 0
    margin: 0
    padding: 1em
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

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0

</style>
