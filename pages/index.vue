<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitText } from './../utils/utils'

gsap.registerPlugin(ScrollTrigger)


// setting head
useHead({
  title: 'Wilson\'s Profile',
})

// section banner
const bannerVideo = ref(null)

onMounted(() => {
  bannerVideo.value.playbackRate = 1.5
})

// split text
const introTitle = ref(null)
const introBrief = ref(null)
const useSplitText = () => {
  const splits = document.querySelectorAll('[data-split]')
  splits.forEach(el => {
    if (el.classList.contains('split-active')) return;
    const text = el.innerHTML
    const { text: nexText } = splitText({ text, delay: true, delay: true })
    el.innerHTML = nexText
    el.classList.add('split-active')
  })
}
const useIntroText = () => {
  let now = 0
  const children = introTitle.value.children
  const duration = 1200
  const useTextAnimation = () => {
    if (now < children.length) {
      const last = now - 1
      if (last > -1) children[last].classList.add('hidden')
      children[now].classList.add('active')
      if (now === children.length - 1) {
        setTimeout(() => {
          introBrief.value.children[0].classList.add('active')
        }, 500)
      }
      now += 1
    }
    else {
      return clearInterval(textAnimation)
    }
  }
  const textAnimation = setInterval(useTextAnimation, duration)
}

onMounted(() => {
  useSplitText()
  useIntroText()
})


// gasp animation
const useGsap = () => {
  const bannerTrigger = {
    trigger: 'section.banner',
    start: 'top top',
    end: '70% bottom',
    scrub: true,
  }
  ScrollTrigger.matchMedia({
    // desktop animation
    "(min-width: 768px)": function() {
      gsap.to('.banner .image-wrap video', {
        scale: 1,
        opacity: .5,
        rotate: '0deg',
        filter: 'grayscale(.4)',
        '-webkit-filter': 'grayscale(.4)',
        scrollTrigger: { ...bannerTrigger }
      })
      gsap.to('.banner .intro-wrap', {
        opacity: 0,
        scale: 0.3,
        rotate: '-8deg',
        scrollTrigger: {
          ...bannerTrigger,
          end: '60% bottom',
        }
      })
      gsap.to('.banner .image-wrap', {
        scale: 5,
        rotate: '-10deg',
        scrollTrigger: {
          ...bannerTrigger,
          start: '75% bottom',
          end: 'bottom bottom',
        }
      })
      gsap.to('.banner .bg-wrap', {
        opacity: 0,
        scrollTrigger: {
          ...bannerTrigger,
          start: '75% bottom',
          end: 'bottom bottom',
        }
      })
    },
    // mobile animation
    "(max-width: 767px)": function() {
      gsap.to('.banner .image-wrap img', {
        scale: 1,
        opacity: .6,
        rotate: '0deg',
        filter: 'grayscale(.2)',
        '-webkit-filter': 'grayscale(.2)',
        scrollTrigger: { ...bannerTrigger }
      })
      gsap.to('.banner .intro-wrap', {
        opacity: 0,
        scale: 0.1,
        rotateY: '78deg',
        rotateZ: '12deg',
        scrollTrigger: { ...bannerTrigger }
      })
    },
    "all": function() {
      
    }
  })
}

onMounted(() => {
  useGsap()
})

</script>

<template>
  <main>
    <div class="noise-cover"></div>
    <!-- banner -->
    <section class="banner">
      <div class="bg-wrap">
        <div class="image-wrap">
          <video src="@/assets/images/banner_video.mp4" ref="bannerVideo" muted autoplay loop playsinline></video>
          <img src="@/assets/images/banner_photo.jpg" alt="">
        </div>
        <div class="intro-wrap">
          <div class="title" ref="introTitle">
            <p data-split>Hi</p>
            <p data-split>I'm Wilson.</p>
          </div>
          <div class="brief" ref="introBrief">
            <p data-split>A Frontend Developer.</p>
          </div>
        </div>
      </div>
    </section>
    
  </main>
</template>

<style lang="sass">
@import @/assets/styles/pages/index
</style>