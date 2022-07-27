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
      <div class="logo" data-anchor-target="">
        <img src="@/assets/images/logo.svg" alt="">
      </div>
      <nav>
        <div class="link" data-anchor-target=".about-anchor" data-cotton="explore">
          <span>ABOUT</span>
        </div>
        <div class="link" data-anchor-target="section.works" data-cotton="explore">
          <span>WORKS</span>
        </div>
        <div class="link" data-anchor-target="section.projects" data-cotton="explore">
          <span>SIDE PROJECTS</span>
        </div>
        <div class="link" data-anchor-target="section.contact" data-cotton="explore">
          <span>CONTACT</span>
        </div>
      </nav>
    </div>
  </header>
</template>