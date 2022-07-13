<script setup>
const { Anchor } = useNuxtApp()

// Anchor init
const useAnchor = () => {
  new Anchor('header [data-anchor-target]')
}

onMounted(() => {
  useAnchor()
})
</script>

<template>
  <header class="space-lr">
    <div class="container">
      <nuxt-link class="logo" to="/">
        <img src="@/assets/images/logo.svg" alt="">
      </nuxt-link>
      <nav>
        <div class="link" data-anchor-target=".about-anchor">
          <span>ABOUT</span>
        </div>
        <div class="link" data-anchor-target="section.works">
          <span>WORKS</span>
        </div>
        <div class="link" data-anchor-target="section.projects">
          <span>SIDE PROJECTS</span>
        </div>
        <div class="link" data-anchor-target="section.contact">
          <span>CONTACT</span>
        </div>
      </nav>
      <div class="menu-btn">
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>