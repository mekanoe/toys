import React, { Fragment } from 'react'
import { bingo, fifteen, humanizeNum } from './game-logic'
import './CallBoard.sass'


const CallBoard = ({ calledNumbers, timerActive = false, timeout }) => <div className="cb">
  <div className="cb__lightboard">
    {
      bingo.map((l, lk) => <Fragment key={lk}>
        <div className={`cb__lightboard__item header`}>{l}</div>
        {
          fifteen.map((_, nya) => {
            const offset = fifteen.length * lk
            const num = nya+offset+1
            return <div key={nya} className={`cb__lightboard__item ${calledNumbers.has(num) ? 'called' : ''}`}>{num}</div>
          })
        }
      </Fragment>)
    }
  </div>
  <div className="cb__recent">
    <div className="cb__recent__current">
    {
      (timerActive === true) 
      ? <div class="timer" style={{ '--timeout': `5s` }}>
          <div className="spinner pie"></div>
          <div className="filler pie"></div>
          <div className="mask"></div>
        </div>
      : null
    }
    <div className="text">
    { 
      humanizeNum(calledNumbers.last() || 0) 
    }
    </div>
    </div>
    <div className="cb__recent__backlog">
    {
      calledNumbers.slice(-6, -1).map((i, n) => <div key={n} className="cb__lightboard__item">{humanizeNum(i||0)}</div>).toArray()
    }
    </div>
  </div>
</div>

export default CallBoard
