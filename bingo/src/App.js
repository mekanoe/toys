import React, { Component } from 'react'
import { Map, OrderedSet } from 'immutable'
import GameLogic from './game-logic'
import './App.sass'

import GameBoard from './GameBoard'
import CallBoard from './CallBoard'

const bingo = [...'bingo']
const rowCap = 15


class App extends Component {
  logic = null
  state = {
    gameBoard: Map(),
    calledNumbers: OrderedSet(),
    timerActive: false
  }

  buildGameBoard () {
    const gameBoard = this.logic.buildGameBoard()
    console.log(gameBoard)
    this.setState({ gameBoard })
  }

  onCall = (calledNumbers) => {
    this.setState({ calledNumbers })
  }

  componentWillMount () {
    this.logic = new GameLogic()
    window.__GAMELOGIC__ = this.logic

    this.logic.on(Symbol.for('game: call'), this.onCall)
    this.logic.on(Symbol.for('game: over'), () => { this.setState({ timerActive: false }) })

    this.buildGameBoard()
    this.setState({ timerActive: true })
    setTimeout(() => {
      this.logic.startGame()
    }, 1000*0.15)
  }

  onSelect = (cell, state, oldState) => {
    this.setState(({gameBoard}) => ({
      gameBoard: gameBoard.setIn([cell, 'selected'], state)
    }))
  }

  render () {
    return <div className='app'>
      <section>
        <CallBoard calledNumbers={this.state.calledNumbers} timerActive={this.state.timerActive}/>
      </section>
      <section>
        <GameBoard gameBoard={this.state.gameBoard} onSelect={this.onSelect} />
      </section>
    </div>
  }
}

export default App
