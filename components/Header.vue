<script setup>
const { Anchor } = useNuxtApp()

// Anchor init
const useAnchor = () => {
  new Anchor('[data-anchor-target]')
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
        <div class="link" data-anchor-target=".profile-wrap" data-anchor-spacer=".profile-wrap">
          <span>ABOUT</span>
        </div>
        <div class="link" data-anchor-target="section.works">
          <span>WORKS</span>
        </div>
        <div class="link" data-anchor-target="section.projects">
          <span>SIDE PROJECTS</span>
        </div>
      </nav>
    </div>
  </header>
</template>