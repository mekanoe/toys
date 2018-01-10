import React from 'react'
import { bingo } from './game-logic'
import './GameBoard.sass'

const gameBoard = ({ gameBoard, onSelect }) => <div className='gb'>
  {
    bingo.map((v, k) => <div className='gb__header' key={k}>{v.toUpperCase()}</div>)
  }
  {
    bingo.map((_, k2) =>
      bingo.map((_, k1) =>
        <div
          className={`gb__item ${gameBoard.getIn([`${k2}${k1}`, 'selected']) === true ? 'selected' : ''}`}
          key={`${k2}${k1}`}
          data-value={gameBoard.getIn([`${k2}${k1}`, 'value'])}
          onClick={onSelect.bind(null, `${k2}${k1}`, !gameBoard.getIn([`${k2}${k1}`, 'selected']))}
        >
          {gameBoard.getIn([`${k2}${k1}`, 'value'])}
        </div>
      )
    )
  }
</div>

export default gameBoard
