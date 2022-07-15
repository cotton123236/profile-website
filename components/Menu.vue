<script setup>
const menuActive = ref(false)
const menuVideo = ref(null)
const { Anchor } = useNuxtApp()

// Anchor init
const useAnchor = () => {
  new Anchor('.menu [data-anchor-target]', {
    delay: 800
  })
}

// control menu open or close
const useMenuControl = () => {
  menuActive.value = !menuActive.value
  if (!menuVideo.value) return;
  if (menuActive.value) {
    menuVideo.value.currentTime = 0
    menuVideo.value.play()
  }
}

// close menu
const closeMenu = () => {
  menuActive.value = false
}

onMounted(() => {
  useAnchor()
})
</script>

<template>
  <div class="menu space-lr" :class="{ show: menuActive }">
    <div class="menu-bg">
      <div class="bg-wrap">
        <video src="@/assets/images/index/menu_bg.mp4" ref="menuVideo" muted playsinline></video>
      </div>
    </div>
    <div class="container">
      <div class="menu-btn" @click="useMenuControl">
        <span></span>
        <span></span>
      </div>
      <div class="menu-content">
        <div class="menu-main">
          <div class="pages" ref="pages">
            <div class="anchor" data-cotton="explore" data-anchor-target=".about-anchor" @click="closeMenu">ABOUT</div>
            <div class="anchor" data-cotton="explore" data-anchor-target="section.works" @click="closeMenu">WORKS</div>
            <div class="anchor" data-cotton="explore" data-anchor-target="section.projects" @click="closeMenu">SIDE PROJECTS</div>
            <div class="anchor" data-cotton="explore" data-anchor-target="section.contact" @click="closeMenu">CONTACT</div>
          </div>
        </div>
        <div class="menu-sub">
          <div class="mail">
            <a href="mailto:cotton123236@gmail.com" data-cotton="explore">
              <span>cotton123236@gmail.com</span>
            </a>
          </div>
          <div class="links">
            <a href="https://github.com/cotton123236" target="_blank">GITHUB</a>
            <a href="https://www.linkedin.com/in/cotton123236" target="_blank">LINKEDIN</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>