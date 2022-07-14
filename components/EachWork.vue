<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  work: Object
})

const parallaxWrap = ref(null)
const parallaxImage = ref(null)
const translateX = ref(0)

// parallax
const useParallax = () => {
  gsap.to(parallaxImage.value, {
    scrollTrigger: {
      trigger: 'section.works',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        if (!parallaxWrap.value || !parallaxImage.value) return;
        const wrapWidth = parallaxWrap.value.offsetWidth
        const imageWidth = parallaxImage.value.offsetWidth
        const diff = imageWidth - wrapWidth
        translateX.value = diff * self.progress
      }
    }
  })
}

onMounted(() => {
  useParallax()
})
</script>

<template>
  <li class="each-work" ref="parallaxWrap">
    <a :href="work.href" target="_blank" data-cotton="explore">
      <div class="photo-box">
        <div class="photo" ref="parallaxImage" :style="{transform: `translate3d(${translateX}px, 0, 0)`}">
          <img :src="work.image" alt="">
        </div>
      </div>
      <div class="text-box">
        <div class="title">{{ work.title }}</div>
        <div class="sub-title">{{ work.subTitle }}</div>
      </div>
    </a>
  </li>
</template>
