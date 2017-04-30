export default class Game {
  constructor () {
    this.xAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    this.yAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']

    const map = this.generateMap()

    this.playerMap = {...map}
    this.opponentMap = {...map}
  }

  generateMap () {
    const map = {}
    const emptyCell = {
      type: 'water',
      hit: false
    }

    this.yAxis.forEach((_, y) => {
      this.xAxis.forEach((_, x) => {
        map[y + x] = {...emptyCell}
      })
    })

    return map
  }

  placePlayer (piece, position, rotation) {
    // get positions
    const length = 5

    const positions = [position]
    for (let i = length; i > 1; i--) {
      let cell = this.getAdjCell(position, rotation)
      if (cell !== null) {
        positions.push(cell)
      } else {
        return false
      }
    }
  }

  get (map, {x, y}) {
    return map[y + x]
  }

  getAdjCell (from, direction) {
    let cell = {...from}

    const move = function (array, _from, to) {
      let pos = array.indexOf(_from)

      // Negative bounds
      if (to === -1 && pos === 0) {
        return null
      }

      // Positive bounds
      if (to === +1 && pos === array.length - 1) {
        return null
      }

      return array[pos + to]
    }

    switch (direction) {
      // Y axis changes
      case 'left':
        cell.y = move(this.yAxis, from.y, -1)
        break
      case 'right':
        cell.y = move(this.yAxis, from.y, +1)
        break

      // X axis changes
      case 'up':
        cell.x = move(this.xAxis, from.x, -1)
        break
      case 'down':
        cell.x = move(this.xAxis, from.x, +1)
        break
    }

    if (cell.x === null || cell.y === null) {
      return null
    }

    return cell
  }
}
