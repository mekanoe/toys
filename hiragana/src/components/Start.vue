<template>
  <div id="start">
    <h1>
      ひらがなゲーム
    </h1>
      <router-link :to="{name: 'GameSetup'}" class="button button-start item">
        <span class="en">Start Game</span>
        <span class="jp">ゲームをスタート</span>
      </router-link>

      <router-link :to="{name: 'HowToPlay'}" class="button button-htp item">
        <span class="en">How to Play</span>
        <span class="jp">ゲームのプレイ方法</span>
      </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="sass" scoped>
  #start

  .item
    display: block

  .button
    background-color: #2a1b22 + #111
    box-shadow: 0 0 4px #2a1b22 - #111
    padding: 2.25em
    margin: 0.5em
    text-decoration: none
    color: #efefef
    position: relative
    transition: all 0.3s ease-in-out
    transform: translateZ(0)


    .jp, .en
      position: absolute
      transition: opacity 0.4s ease-in-out
      left: 0
      right: 0
      top: calc(50% - 0.6em)


    .jp
      opacity: 0

    .en
      opacity: 1

    &:hover
      box-shadow: 0 0 8px #2a1b22 - #111
      transform: scale(1.05, 1.05)

      .en
        opacity: 0
      .jp
        opacity: 1

  h1
    font-size: 2.5em
    margin: 1em
    text-shadow:  0 0 4px #2a1b22 - #111


</style>
