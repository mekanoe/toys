import { Map, Set, OrderedSet, List } from 'immutable'
import EventEmitter from 'eventemitter3'

export const bingo = [...'💖🌈💢🐾🦋']
export const fifteen = [...'a'.repeat(15)]
export const sevenfive = [...'a'.repeat(75)]
export const humanizeNum = (num) => (num === 0) ? 'X00' : `${bingo[Math.ceil(num/15)-1]}${num}`

export const speak = async (text, voice, {preDelay = 0, postDelay = 0} = {}) => {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.onend = () => {
      setTimeout(() => {
        resolve()
      }, postDelay)
    }

    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, preDelay)
  })
}

export default class GameLogic extends EventEmitter {
  timeout = 5000
  calledNumbers = OrderedSet()
  notCalledNumbers = sevenfive.map((_, nya) => nya+1)

  generateNumber () { 
    return Math.ceil(Math.random() * 15) 
  }

  generateRow () {  
    let out = Set()
    while (out.size < bingo.length) { 
      out = out.add(this.generateNumber()) 
    }
    return out.toArray()
  }

  generateColumns () { 
    return bingo.map((_, k) => this.generateRow().map(i => (k*15)+i))
  }

  buildGameBoard () {
    const cols = this.generateColumns()
    return cols.reduce((acc, set, rowKey) => {
      set.forEach((num, colKey) => {
        acc = acc.set(`${colKey}${rowKey}`, Map({ selected: false, value: num }))
      })

      return acc
    }, Map()).setIn(['22', 'value'], 'FREE')
  }

  callNumber () {
    const rk = Math.floor(Math.random()*(this.notCalledNumbers.length))
    const num = this.notCalledNumbers[rk]

    this.notCalledNumbers = this.notCalledNumbers.filter((_, i) => i !== rk)

    this.calledNumbers = this.calledNumbers.add(num)
    this.emit(Symbol.for('game: call'), this.calledNumbers)
    this.tts(num)
  }

  startGame () {
    this.update()
  }

  update = () => {
    this.callNumber()
    if (this.notCalledNumbers.length > 0) {
      setTimeout(this.update, this.timeout)
    } else {
      this.emit(Symbol.for('game: over'))
    }
  }

  tts (num) {
    // /speak(humanizeNum(num))
  }
}