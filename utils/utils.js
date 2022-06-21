export const splitText = (options) => {
  const { text = '', wrap = true, random, delay } = options
  const wrapStartTag = () => `<span class="letter-wrap" style="display: inline-block;">`
  const wrapEndTag = () => '</span>'
  const letterStartTag = (style = '') => `<span class="letter" style="display: inline-block;${style}">`
  const letterEndTag = () => '</span>'

  const removeBrText = text.split('<br>')
  let newText = ''
  let eq = 0
  let lastDelay
  
  removeBrText.forEach((sentence, i) => {
    if (i !== 0) newText += '<br>'
    const letters = sentence.split('')
    
    letters.forEach((letter, j) => {
      if (j === 0 && wrap) newText += wrapStartTag()
      if (letter === ' ') newText += wrap ? `${wrapEndTag()} ${wrapStartTag()}` : ' '
      else {
        let trans
        if (random) {
          const { min = 0.2, max = 2 } = random
          trans = `transition-duration: ${(Math.random() * (max - min) + min).toFixed(2)}s`
        }
        else if (delay) {
          const { min = 0, space = 0.02 } = delay
          lastDelay = (min + space * eq).toFixed(2)
          trans = `transition-delay: ${lastDelay}s`
        }
        newText += `${letterStartTag(trans)}${letter}${letterEndTag()}`
      }
      eq++
    })

    newText += wrapEndTag()
  })

  return {
    text: newText,
    lastDelay
  }
}