<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  work: Object
})

const parallaxWrap = ref(null)
const parallaxWrapWidth = ref(0)
const parallaxImage = ref(null)
const parallaxImageWidth = ref(0)
const translateX = ref(0)

// get elements width
const getEleWidth = () => {
  if (!parallaxWrap.value || !parallaxImage.value) return;
  parallaxWrapWidth.value = parallaxWrap.value.offsetWidth
  parallaxImageWidth.value = parallaxImage.value.offsetWidth
}

// parallax
const useParallax = () => {
  gsap.to(parallaxImage.value, {
    scrollTrigger: {
      trigger: 'section.works',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        if (!parallaxImageWidth.value || !parallaxWrapWidth.value) return;
        const diff = parallaxImageWidth.value - parallaxWrapWidth.value
        translateX.value = diff * self.progress
      }
    }
  })
}

onMounted(() => {
  getEleWidth()
  useParallax()
  window.addEventListener('scroll', getEleWidth)
})
</script>

<template>
  <li class="each-work" ref="parallaxWrap" data-aos>
    <a :href="work.href" target="_blank" data-cotton="explore">
      <div class="photo-box">
        <div class="photo" ref="parallaxImage" :style="{transform: `translate3d(${translateX}px, 0, 0)`}">
          <img :src="work.image" alt="">
        </div>
      </div>
      <div class="text-box">
        <div class="title">{{ work.title }}</div>
        <div class="sub-title brief-text">{{ work.subTitle }}</div>
        <p class="tech">{{ work.tech }}</p>
      </div>
    </a>
  </li>
</template>
