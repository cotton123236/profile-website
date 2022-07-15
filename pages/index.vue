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
const worksBg = ref(null)
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
}

onMounted(() => {
  useVideoSpeed()
  useSplitText()
  useIntroAnimate()
  useProjectFocus()
  useFigureParallax()
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
            if (!worksUl.value) return;
            const ulWidth = worksUl.value.offsetWidth
            const contentWidth = worksContent.value.offsetWidth
            const diff = (contentWidth - ulWidth) * self.progress
            worksContent.value.style.transform = `translate3d(${diff}px, 0, 0)`
          }
        }
      })
      gsap.to('.contact .leaf', {
        y: 100,
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
  useGsap()
  scrollToTop()
})

</script>

<template>
  <main>
    <!-- cursor -->
    <Cursor />
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
      <div class="photo-box" ref="figureContainer">
        <div
          class="photo"
          ref="figureImage"
          :style="{ transform: `translate3d(0, ${figureTranslate}px, 0)` }"
        >
          <img src="@/assets/images/index/figure.jpg" alt="">
        </div>
      </div>
    </section>
    <!-- skills -->
    <!-- <section class="skills space-lr">
      <div class="container">
        <div class="block-terms">
          <div class="note">SKILLS</div>
        </div>
      </div>
    </section> -->
    <!-- contact -->
    <section class="contact space-lr">
      <div class="container">
        <div class="block-terms">
          <div class="note">CONTACT</div>
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
              <div class="leaf">
                <img src="@/assets/images/index/leaf_01.png" alt="">
              </div>
            </a>
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