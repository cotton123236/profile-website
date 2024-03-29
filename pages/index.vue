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
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  meta: [
    {
      name: 'description',
      content: 'Hi! I\'m Wilson. A frontend developer. 熱衷於網站開發，擅長製作動態特效互動式網站，使用 Nuxt / Vue 3 / Vite 做開發。'
    },
    {
      name: 'keywords',
      content: 'Wilson Wu / web design / frontend development / personal website / works / side projects / nuxt.js / vue 3'
    },
    {
      name: 'canonical',
      content: 'https://imwilson.netlify.app/'
    }
  ],
})

// define Refs
const scrollCoverShow = ref(false)
const introVideo = ref(null)
const introTitle = ref(null)
const introBrief = ref(null)
const worksBg = ref(null)
const worksUl = ref(null)
const worksUlWidth = ref(0)
const worksContent = ref(null)
const worksContentWidth = ref(0)
const worksTranslate = ref(0)
const projectUl = ref(null)
const figureContainer = ref(null)
const figureImage = ref(null)
const figureTranslate = ref(0)

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
        ScrollTrigger.matchMedia({
          // desktop animation
          "(min-width: 1025px)": function() {
            gsap.to('.bg-cover .desktop', { scale: 1, rotate: '0deg' })
            gsap.to('.intro .intro-wrap', { opacity: 0, scale: 0.3, rotate: '-8deg' })
          },
          // tablet animation
          "(min-width: 768px) and (max-width: 1024px)": function() {
            gsap.to('.bg-cover .tablet', { scale: 1, rotate: '0deg' })
            gsap.to('.intro .intro-wrap', { opacity: 0, scale: 0.3, rotate: '-8deg' })
          },
          // mobile animation
          "(max-width: 767px)": function() {
            gsap.to('.bg-cover .mobile', { scale: 1, rotate: '0deg' })
            gsap.to('.intro .intro-wrap', { opacity: 0, scale: 0.3, rotateY: '78deg', rotateZ: '12deg' })
          }
        })
        gsap.to('.bg-cover .color-wrap.intro-bg', { opacity: 0 })
        document.body.classList.add('dark-mode')
        scrollCoverShow.value = true
      }, 1000)
      return clearInterval(textAnimation)
    }
  }
  const textAnimation = setInterval(useTextAnimation, duration)
}

// projects mouseenter focus
const useProjectFocus = () => {
  const children = projectUl.value.children
  const mouseenterHandler = function() {
    [...children].forEach(child => {
      if (child !== this) child.classList.add('is-disable')
    })
  };
  const mouseleaveHandler = function() {
    [...children].forEach(child => {
      child.classList.remove('is-disable')
    })
  };
  [...children].forEach(child => {
    child.addEventListener('mouseenter', mouseenterHandler)
    child.addEventListener('mouseleave', mouseleaveHandler)
  })
}

// section figure parallax effect
const useFigureParallax = () => {
  gsap.to(figureImage.value, {
    scrollTrigger: {
      trigger: figureContainer.value,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: self => {
        if (!figureImage.value) return;
        const imageHeight = figureImage.value.offsetHeight
        const containerHeight = figureContainer.value.offsetHeight
        const diff = imageHeight - containerHeight
        figureTranslate.value = diff * self.progress
      }
    }
  })
  gsap.to('.term.inside', {
    x: '60%',
    scrollTrigger: {
      trigger: figureContainer.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
  gsap.to('.term.outside', {
    x: '60%',
    scrollTrigger: {
      trigger: figureContainer.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

onMounted(() => {
  useVideoSpeed()
  useSplitText()
  useIntroAnimate()
  useProjectFocus()
  useFigureParallax()
})


// get works elements width
const getWorksWidth = () => {
  if (!worksUl.value || !worksContent.value) return;
  worksUlWidth.value = worksUl.value.offsetWidth
  worksContentWidth.value = worksContent.value.offsetWidth
}

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
    "(min-width: 1025px)": function() {
      gsap.to('.bg-cover .image-wrap', {
        scale: 3.7,
        opacity: .4,
        rotate: '-5deg',
        scrollTrigger: { ...introBotTrigger }
      })
    },
    // tablet animation
    "(min-width: 768px) and (max-width: 1024px)": function() {
      gsap.to('.bg-cover .image-wrap', {
        scale: 2.5,
        opacity: .4,
        rotate: '-8deg',
        scrollTrigger: { ...introBotTrigger }
      })
    },
    // mobile animation
    "(max-width: 767px)": function() {
      gsap.to('.bg-cover .image-wrap', {
        scale: 4,
        opacity: .4,
        rotate: '8deg',
        scrollTrigger: { ...introBotTrigger }
      })
    },
    "all": function() {
      gsap.to('.bg-cover .image', {
        filter: 'grayscale(.2)',
        '-webkit-filter': 'grayscale(.2)',
        scrollTrigger: { ...introBotTrigger, start: '0 top', end: '5% top' }
      })
      gsap.to('.noise-cover', {
        opacity: .7,
        scrollTrigger: { ...introBotTrigger, start: '0 top', end: '5% top' }
      })
      gsap.to('.image-cover', {
        scale: 2,
        scrollTrigger: { ...introBotTrigger, start: '0 top', end: '5% top' }
      })
      gsap.to('.scroll-cover .cover-wrap', {
        opacity: 0,
        scrollTrigger: { ...introBotTrigger, start: '0 top', end: '5% top' }
      })
      gsap.to('.bg-cover .color-wrap.profile-bg', {
        opacity: 0,
        scrollTrigger: { ...introBotTrigger },
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
      gsap.to(worksBg.value, {
        scrollTrigger: {
          trigger: '.works',
          endTrigger: '.projects',
          start: 'top top',
          end: '50% top',
          scrub: true,
          onUpdate: self => {
            if (!worksBg.value) return;
            if (self.progress !== 0 && self.progress !== 1) {
              worksBg.value.classList.add('show')
              document.body.classList.add('dark-mode')
            }
            else {
              worksBg.value.classList.remove('show')
              document.body.classList.remove('dark-mode')
            }
          }
        }
      })
      gsap.to(worksUl.value, {
        scrollTrigger: {
          ...worksTrigger,
          onUpdate: self => {
            if (!worksContentWidth.value || !worksUlWidth.value) return;
            worksTranslate.value = (worksContentWidth.value - worksUlWidth.value) * self.progress
          }
        }
      })
      gsap.to('.contact .leaf', {
        y: 100,
        rotate: '60deg',
        scrollTrigger: {
          trigger: '.contact .leaf',
          scrub: true,
          start: 'top bottom',
          end: 'bottom top'
        }
      })
    }
  })
}

// always scroll to top
const scrollToTop = () => {
  window.scrollTo(0, 0)
}

onMounted(() => {
  getWorksWidth()
  useGsap()
  scrollToTop()
  window.addEventListener('scroll', getWorksWidth)
})

</script>

<template>
  <main>
    <!-- cursor -->
    <!-- <Cursor /> -->
    <!-- scroll-cover -->
    <ScrollCover :class="{ show: scrollCoverShow }" />
    <!-- noise -->
    <div class="noise-cover"></div>
    <!-- background -->
    <div class="bg-cover">
      <div class="color-wrap intro-bg"></div>
      <div class="color-wrap profile-bg"></div>
      <div class="color-wrap works-bg" ref="worksBg"></div>
      <div class="image-wrap">
        <video class="image desktop" src="@/assets/images/index/intro_video.mp4" ref="introVideo" muted autoplay loop playsinline></video>
        <img class="image tablet" src="@/assets/images/index/intro_pad.jpg" alt="">
        <img class="image mobile" src="@/assets/images/index/intro_phone.jpg" alt="">
        <img class="image bg" src="@/assets/images/index/intro_bg.png" alt="">
        <div class="image-cover"></div>
      </div>
    </div>
    <!-- intro -->
    <section class="intro">
      <div class="scroll-detect"></div>
      <div class="about-anchor"></div>
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
              <div class="note aos-animate">ABOUT</div>
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
                  <h2 class="name">
                    <span class="tw">{{ about.nameTw }}</span>
                    <span class="en">{{ about.nameEn }}</span>
                  </h2>
                  <div class="slash">/</div>
                  <h3 class="slogan">{{ about.slogan }}</h3>
                  <p v-html="about.brief"></p>
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
            <div class="note" data-aos><span>works</span></div>
          </div>
          <div class="block-content" ref="worksContent">
            <ul ref="worksUl" :style="{ transform: `translate3d(${worksTranslate}px, 0, 0)` }">
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
          <div class="note" data-aos><span>side projects</span></div>
        </div>
        <div class="block-content">
          <ul ref="projectUl">
            <EachProject
              v-for="project in projects"
              :key="project._id"
              :project="project"
            />
          </ul>
        </div>
      </div>
    </section>
    <!-- figure -->
    <section class="figure">
      <div class="block-content">
        <div class="photo-box" ref="figureContainer">
          <div
            class="photo"
            ref="figureImage"
            :style="{ transform: `translate3d(0, ${figureTranslate}px, 0)` }"
          >
            <img src="@/assets/images/index/figure.jpg" alt="">
          </div>
          <div class="term inside">BE CREATIVE</div>
        </div>
        <div class="term outside">BE CREATIVE</div>
      </div>
    </section>
    <!-- contact -->
    <section class="contact space-lr">
      <div class="container">
        <div class="block-terms">
          <div class="note" data-aos><span>CONTACT</span></div>
        </div>
        <div class="block-content">
          <div class="name brief-text">
            <span class="tw">吳佾闈</span>
            <span class="en">Wilson Wu</span>
          </div>
          <div class="slash">/</div>
          <div class="mail">
            <a href="mailto:cotton123236@gmail.com" data-cotton="explore">
              <span>cotton123236@gmail.com</span>
            </a>
            <div class="leaf">
              <img src="@/assets/images/index/leaf_01.png" alt="">
            </div>
          </div>
          <div class="links">
            <a href="https://github.com/cotton123236" target="_blank" data-cotton="explore">GITHUB</a>
            <a href="https://www.linkedin.com/in/cotton123236" target="_blank" data-cotton="explore">LINKEDIN</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass">
@import @/assets/styles/pages/index
</style>