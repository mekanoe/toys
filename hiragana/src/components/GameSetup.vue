<template>
  <div>
    <h3>click/tap the characters you want to try</h3>

    <h4>hiragana</h4>
    <div class="button">all</div>
    <div class="button">random 10</div>
    <div class="button">random sets</div>
    <div class="char-container">
      <div v-for="char in dictionary.hiragana" class="char">
        <div class="char--kana">{{char.kana}}</div>
        <div class="char--romaji">({{char.romaji[0]}})</div>
      </div>
    </div>
  </div>
</template>

<script>
  import dictionary from '@/dictionary'

  export default {
    data () {
      return {
        dictionary,
        picked: []
      }
    }
  }
</script>

<style lang="sass" scoped>

  .char-container
    display: flex
    flex-wrap: wrap

</style>
