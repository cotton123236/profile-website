<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storeToRefs } from 'pinia'
import { useIndexStore } from './../store/index'
import { splitText } from './../utils/utils'

gsap.registerPlugin(ScrollTrigger)

const indexStore = useIndexStore()

// setting head
useHead({
  title: 'Wilson\'s Profile',
})


// section intro
const introVideo = ref(null)
const introTitle = ref(null)
const introBrief = ref(null)
const { works } = storeToRefs(indexStore)


// change intro video speed
const useVideoSpeed = () => {
  introVideo.value.playbackRate = 1.5
}

// split text
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

// intro text animation
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
  useVideoSpeed()
  useSplitText()
  useIntroText()
})


// gasp animation
const useGsap = () => {
  const introTopTrigger = {
    trigger: 'section.intro',
    start: 'top top',
    end: '70% bottom',
    scrub: true,
  }
  const introBotTrigger = {
    trigger: 'section.intro',
    start: '71% bottom',
    end: 'bottom bottom',
    scrub: true,
  }
  ScrollTrigger.matchMedia({
    // desktop animation
    "(min-width: 768px)": function() {
      gsap.to('.bg-cover video', {
        scale: 1,
        opacity: .5,
        rotate: '0deg',
        scrollTrigger: { ...introTopTrigger }
      })
      gsap.to('.bg-cover video', {
        filter: 'grayscale(.2)',
        '-webkit-filter': 'grayscale(.2)',
        scrollTrigger: { ...introBotTrigger, start: '70% bottom', end: '75% bottom' }
      })
      gsap.to('.bg-cover .image-wrap', {
        scale: 3.7,
        opacity: .5,
        rotate: '-5deg',
        scrollTrigger: { ...introBotTrigger }
      })
      gsap.to('.bg-cover .color-wrap', {
        opacity: 0,
        scrollTrigger: { ...introBotTrigger }
      })
      gsap.to('.intro .intro-wrap', {
        opacity: 0,
        scale: 0.3,
        rotate: '-8deg',
        scrollTrigger: {
          ...introTopTrigger,
          end: '60% bottom',
        }
      })
      gsap.to('.intro .profile-wrap', {
        scale: 1,
        opacity: 1,
        rotate: 0,
        scrollTrigger: { ...introBotTrigger, start: '74% bottom' }
      })
      gsap.to('.intro .profile-wrap .headshot', {
        scale: 1,
        scrollTrigger: { ...introBotTrigger, start: '74% bottom' }
      })
    },
    // mobile animation
    "(max-width: 767px)": function() {
      gsap.to('.intro .image-wrap img', {
        scale: 1,
        opacity: .6,
        rotate: '0deg',
        filter: 'grayscale(.2)',
        '-webkit-filter': 'grayscale(.2)',
        scrollTrigger: { ...introTrigger }
      })
      gsap.to('.intro .intro-wrap', {
        opacity: 0,
        scale: 0.1,
        rotateY: '78deg',
        rotateZ: '12deg',
        scrollTrigger: { ...introTrigger }
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
    <div class="bg-cover">
      <div class="color-wrap"></div>
      <div class="image-wrap">
        <video src="@/assets/images/index/intro_video.mp4" ref="introVideo" muted autoplay loop playsinline></video>
        <img src="@/assets/images/index/intro_photo.jpg" alt="">
      </div>
    </div>
    <!-- intro -->
    <section class="intro">
      <div class="bg-wrap">
        <div class="intro-wrap">
          <div class="title" ref="introTitle">
            <p data-split>Hi</p>
            <p data-split>I'm Wilson.</p>
          </div>
          <div class="brief" ref="introBrief">
            <p data-split>A Frontend Developer.</p>
          </div>
        </div>
        <div class="profile-wrap space-lr">
          <div class="container">
            <div class="block-terms">
              <div class="note">Introduction</div>
            </div>
            <div class="profile-content">
              <div class="content-wrap">
                <div class="photo-box">
                  <div class="headshot">
                    <img src="@/assets/images/index/headshot.jpg" alt="">
                  </div>
                </div>
                <div class="text-box">
                  <div class="note">Frontend Developer</div>
                  <div class="name">
                    <span class="tw">吳佾闈</span>
                    <span class="en">Wilson Wu</span>
                  </div>
                  <div class="slogan">Keep Learning, Keep Growing.</div>
                  <p>自 2008 年起，陳嵐舒投入了這段食與飲的旅程。一路至今，從樂沐 Le Moût 到 Gubami ，到小樂沐 Le Côté LM ，以至每段品牌概念的萌芽發起，都是她不斷探索與追尋所結成的果實。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="works space-lr">
      <div class="container">
        <div class="block-terms">
          <div class="note">works</div>
        </div>
        <div class="block-content">
          <ul>
            <EachWork
              v-for="work in works"
              :key="work.id"
              :work="work"
            />
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass">
@import @/assets/styles/pages/index
</style>