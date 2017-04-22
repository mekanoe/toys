// Generic speaking promise.
// -- Arguments
// Object {
//    text      <String>               | The text to say. (Remember this is TTS, it's not perfect.)
//    voice     <SpeechSynthesisVoice> | The voice to use.
//    preDelay  <Number>               | milliseconds to delay before speaking
//    postDelay <Number>               | milliseconds to delay before resolving
// }
// -- Returns
// Promise<null>
export function speak (text, voice, {preDelay, postDelay}) {
  return new Promise((resolve, reject) => {
    const _preDelay = preDelay || 0
    const _postDelay = postDelay || 0
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.onend = () => {
      setTimeout(() => {
        resolve()
      }, _postDelay)
    }

    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, _preDelay)
  })
}

// Creates a pre-baked tts factory.
// -- Arguments
// Object {
//    voice     <SpeechSynthesisVoice> | The voice to use.
// }
// -- Returns
// Function(
//   input <String> OR <Function>
//   preDelay  <Number>               | milliseconds to delay before speaking
//   postDelay <Number>               | milliseconds to delay before resolving
// ): Promise<null>
export function ttsFactory (voice) {
  return (input, delayObj = null) => {
    if (delayObj === null) {
      delayObj = {
        postDelay: 0,
        preDelay: 0
      }
    }

    if (typeof input === 'function') {
      return input(voice, delayObj)
    } else if (typeof input === 'string') {
      return speak(input, voice, delayObj)
    } else {
      throw new Error('input is unexpected type. must be function or string')
    }
  }
}

export default {
  // Callout generic
  callout (coords) {
    return speak.bind(null, coords)
  },

  // Hit/Miss
  hit: speak.bind(null, 'Hit!'),
  miss: speak.bind(null, 'Miss.'),

  // Sunk (opponent losses)
  sunk_carrier: speak.bind(null, "You've sunk my carrier."),
  sunk_battleship: speak.bind(null, "You've sunk my battleship."),
  sunk_pt_boat: speak.bind(null, "You've sunk my PT boat."),
  sunk_submarine: speak.bind(null, "You've sunk my submarine."),
  sunk_destroyer: speak.bind(null, "You've sunk my destroyer."),

  // Lost (current player losses)
  lost_carrier: speak.bind(null, "We've lost our carrier!"),
  lost_battleship: speak.bind(null, "We've lost our battleship!"),
  lost_pt_boat: speak.bind(null, "We've lost our PT boat!"),
  lost_submarine: speak.bind(null, "We've lost our submarine!"),
  lost_destroyer: speak.bind(null, "We've lost our destroyer!"),

  // Unused
  game_over: speak.bind(null, 'Game over.')
}
