<script setup>
import { gsap } from 'gsap'
import gsapCore from 'gsap/gsap-core'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storeToRefs } from 'pinia'
import { useIndexStore } from './../store/index'
import { splitText } from './../utils/utils'

gsap.registerPlugin(ScrollTrigger)

const indexStore = useIndexStore()

// setting head
useHead({
  title: 'Wilson\'s Profile'
})

// define Refs
const introVideo = ref(null)
const introTitle = ref(null)
const introBrief = ref(null)
const worksContent = ref(null)
const worksUl = ref(null)
const { about, works, projects } = storeToRefs(indexStore)
const { updateIndexData } = indexStore

// fetch data
const { data } = await useFetch('https://wilson-backend.herokuapp.com/api/index')
updateIndexData(data.value.data)


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
  introTitle.value.classList.add('white')
  introBrief.value.classList.add('white')
}

// intro animation
const useIntroAnimate = () => {
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
      setTimeout(() => {
        gsap.to('.intro .intro-wrap', { opacity: 0, scale: 0.3, rotate: '-8deg' })
        gsap.to('.bg-cover video', { scale: 1, rotate: '0deg' })
        gsap.to('.bg-cover .color-wrap.intro-bg', { opacity: 0 })
        document.body.classList.add('dark-mode')
      }, 1000)
      return clearInterval(textAnimation)
    }
  }
  const textAnimation = setInterval(useTextAnimation, duration)
}

onMounted(() => {
  useVideoSpeed()
  useSplitText()
  useIntroAnimate()
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
    start: '5% top',
    end: 'bottom bottom',
    scrub: true,
  }
  const worksTrigger = {
    trigger: 'section.works .scroll-detect',
    endTrigger: 'section.works',
    start: 'bottom bottom',
    end: 'bottom bottom',
    scrub: true
  }
  ScrollTrigger.matchMedia({
    // desktop animation
    "(min-width: 768px)": function() {
      gsap.to('.bg-cover video', {
        filter: 'grayscale(.2)',
        '-webkit-filter': 'grayscale(.2)',
        scrollTrigger: { ...introBotTrigger, start: '0 top', end: '5% top' }
      })
      gsap.to('.bg-cover .color-wrap.profile-bg', {
        opacity: 0,
        scrollTrigger: { ...introBotTrigger },
      })
      gsap.to('.bg-cover .image-wrap', {
        scale: 3.7,
        opacity: .4,
        rotate: '-5deg',
        scrollTrigger: { ...introBotTrigger }
      })
      gsap.to('.intro .scroll-detect', {
        scrollTrigger: {
          trigger: '.intro .scroll-detect',
          start: 'top top',
          end: 'bottom top',
          onEnter: () => document.body.classList.remove('dark-mode'),
          onLeaveBack: () => document.body.classList.add('dark-mode')
        }
      })
      gsap.to('.intro .profile-wrap', {
        scale: 1,
        opacity: 1,
        rotate: 0,
        scrollTrigger: { ...introBotTrigger, start: '8% top' }
      })
      gsap.to('.intro .profile-wrap .headshot', {
        scale: 1,
        filter: 'grayscale(.2)',
        '-webkit-filter': 'grayscale(.2)',
        scrollTrigger: { ...introBotTrigger, start: '13% top' }
      })
      gsap.timeline()
      .to('.bg-cover .color-wrap.works-bg', {
        opacity: .9,
        scrollTrigger: {
          trigger: '.works',
          start: '-5% top',
          end: 'top top',
          scrub: true,
          onEnter: () => document.body.classList.add('dark-mode'),
          onLeaveBack: () => document.body.classList.remove('dark-mode')
        }
      })
      .to('.bg-cover .color-wrap.works-bg', {
        opacity: 0,
        scrollTrigger: {
          trigger: '.works',
          start: 'bottom top',
          end: '105% top',
          scrub: true,
          onEnterBack: () => document.body.classList.add('dark-mode'),
          onLeave: () => document.body.classList.remove('dark-mode')
        }
      })
      gsap.to(worksUl.value, {
        scrollTrigger: {
          ...worksTrigger,
          onUpdate: self => {
            const ulWidth = worksUl.value.offsetWidth
            const contentWidth = worksContent.value.offsetWidth
            const diff = (contentWidth - ulWidth) * self.progress
            worksContent.value.style.transform = `translate3d(${diff}px, 0, 0)`
          }
        }
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
    <Cursor />
    <div class="noise-cover"></div>
    <div class="bg-cover">
      <div class="color-wrap intro-bg"></div>
      <div class="color-wrap profile-bg"></div>
      <div class="color-wrap works-bg"></div>
      <div class="image-wrap">
        <video src="@/assets/images/index/intro_video.mp4" ref="introVideo" muted autoplay loop playsinline></video>
        <img src="@/assets/images/index/intro_photo.jpg" alt="">
      </div>
    </div>
    <!-- intro -->
    <section class="intro">
      <div class="scroll-detect"></div>
      <div class="bg-wrap">
        <!-- intro-wrap -->
        <div class="intro-wrap space-lr">
          <div class="title" ref="introTitle">
            <p data-split>Hi</p>
            <p data-split>I'm Wilson.</p>
          </div>
          <div class="brief" ref="introBrief">
            <p data-split>A Frontend Developer.</p>
          </div>
        </div>
        <!-- profile-wrap -->
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
                  <div class="note">{{ about.note }}</div>
                  <div class="name">
                    <span class="tw">{{ about.nameTw }}</span>
                    <span class="en">{{ about.nameEn }}</span>
                  </div>
                  <div class="slash">/</div>
                  <div class="slogan">{{ about.slogan }}</div>
                  <p>{{ about.brief }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- works -->
    <section class="works">
      <div class="scroll-detect"></div>
      <div class="works-wrap space-lr">
        <div class="container">
          <div class="block-terms">
            <div class="note">works</div>
          </div>
          <div class="block-content" ref="worksContent">
            <ul ref="worksUl">
              <EachWork
                v-for="work in works"
                :key="work._id"
                :work="work"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- projects -->
    <section class="projects space-lr">
      <div class="container">
        <div class="block-terms">
          <div class="note">side projects</div>
        </div>
        <div class="block-content">
          <ul>
            <li
              class="each-project"
              v-for="project in projects" :key="project._id"
            >
              <a :href="project.href" data-cotton="explore">
                <div class="info">
                  <div class="title">{{ project.title }}</div>
                  <div class="brief" v-html="project.brief"></div>
                </div>
                <div class="tech" v-html="project.tech"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass">
@import @/assets/styles/pages/index
</style>