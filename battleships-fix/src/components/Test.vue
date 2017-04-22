<template>

<div class="container">

  <h1>Colors</h1>
  <table>
    <tbody>
      <tr><th colspan="2">Primary Palette</th></tr>
        <tr><td class="light"></td><td>$light</td></tr>
        <tr><td class="mid-light"></td><td>$mid-light</td></tr>
        <tr><td class="mid"></td><td>$mid</td></tr>
        <tr><td class="mid-dark"></td><td>$mid-dark</td></tr>
        <tr><td class="dark"></td><td>$dark</td></tr>

        <tr><th colspan="2">Secondary Palette</th></tr>
        <tr><td class="grey"></td><td>$grey</td></tr>
        <tr><td class="red"></td><td>$red</td></tr>
        <tr><td class="green"></td><td>$green</td></tr>
    </tbody>
  </table>

</div>

</template>

<style lang="sass" scoped>
  @import "../sass/variables.sass"

  .container
    background-color: #000
    color: #fff
    width: 600px
    margin: 0 auto
    padding: 10px 1em 3em 1em

  table
    margin: 0 auto

  td
    width: 10em
    text-align: left
    padding: 10px

  .light
    background-color: $light

  .mid-light
    background-color: $mid-light

  .mid
    background-color: $mid

  .mid-dark
    background-color: $mid-dark

  .dark
    background-color: $dark

  .grey
    background-color: $grey

  .red
    background-color: $red

  .green
    background-color: $green

</style>
