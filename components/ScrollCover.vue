<script setup>
const { Anchor } = useNuxtApp()


const scrollCover = ref(null)

// Anchor init
const useAnchor = () => {
  new Anchor('.scroll-cover [data-anchor-target]')
}

// Typing text animation
const typingText = reactive([])
const typingArray = reactive([
  'Wilson.',
  'a frontend developer.',
  'a web designer.'
])
const useTyping = () => {
  if (!scrollCover.value) return;
  let index = 0
  let timer = 100
  typingArray.forEach((text, i) => typingArray[i] = text.split(''))
  const useAnimation = () => {
    let text = [...typingArray[index]]
    const typingAnimate = () => {
      if (text.length) {
        typingText.push(text.shift())
        if (!text.length) timer = 3000
      }
      else if (typingText.length) {
        timer = 100
        typingText.pop()
      }
      if (!text.length && !typingText.length) {
        if (index < typingArray.length - 1) index ++
        else index = 0
        text = [...typingArray[index]]
      }
      setTimeout(typingAnimate, timer)
    }
    setTimeout(typingAnimate, timer)
  }
  useAnimation()
}

onMounted(() => {
  useAnchor()
  setTimeout(() => {
    useTyping()
  }, 5000)
})
</script>

<template>
  <div class="scroll-cover" ref="scrollCover">
    <div class="cover-wrap space-lr">
      <div class="container">
        <div class="text-box brief-text">
          <div class="text">
            Hi! I am 
            <span class="typing">{{ typingText.join('') }}</span>
          </div>
        </div>
        <div class="scroll-btn vertical" data-cotton="explore" data-anchor-target=".about-anchor">
          <span>EXPLORE</span>
        </div>
      </div>
    </div>
  </div>
</template>
