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
            <td class="cell" v-for="y in yCount" :data-cell="y+x" @mouseover="cellHover(y+x, $event)"></td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<script>
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
