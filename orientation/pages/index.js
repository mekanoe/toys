import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ClippedText from '../components/clipped-text'

const GS = createGlobalStyle`
  body {
    background-color: #333345;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #efefef;
  }
`

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 90vh;
`

export default class Home extends React.Component {
  state = {
    x: 0,
    y: 0
  }

  _intv = 0

  async componentDidMount () {
    this.addEventListeners()
  }

  componentWillUnmount () {
    this.removeEventListeners()
  }

  addEventListeners () {
    window.addEventListener('deviceorientation', this.handleOrientation, true)
    document.body.addEventListener('mousemove', this.handleMouseMove)
    document.body.addEventListener('touchmove', this.handleMouseMove)
    // window.ondeviceorientation = this.handleOrientation
  }

  removeEventListeners () {
    document.body.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('deviceorientation', this.handleOrientation, true)
  }

  handleMouseMove = (event) => {
    // viewport dimensions
    const dx = window.innerWidth
    const dy = window.innerHeight

    // mouse pos
    const mx = event.clientX
    const my = event.clientY

    // percentage of movement
    const cx = mx / dx
    const cy = my / dy

    console.log({
      event,
      dx,
      dy,
      mx,
      my,
      cx,
      cy
    })

    this.setState({
      x: 1364 * cx,
      y: 300 * cy
    })
  }

  beta = 0
  gamma = 0

  handleOrientation = (event) => {
    if (this._intv === 0) {
      this._intv = setInterval(() => {
        this.repaint()
      }, 1000 / 10)
    }
    
    const { beta, gamma } = event
    this.beta = beta
    this.gamma = gamma
  }

  repaint () {
    const { beta, gamma } = this

    const cx = 1364 * (beta / 180)
    const cy = 300 * (gamma / 180)

    this.setState({
      x: cx,
      y: cy
    })
  }

  render () {
    const styleOut = {
      '--bg-pos-x': `${this.state.x}px`,
      '--bg-pos-y': `${this.state.y}px`
    }
    return (
      <Center>
        <GS />
        <ClippedText text={`hello.`} backgroundImg='/static/scroll.jpg' style={styleOut}>
          <h1>Hello.</h1>
        </ClippedText>
      </Center>
    )
  }
}
