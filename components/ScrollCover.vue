<script setup>
const { Anchor } = useNuxtApp()

// Anchor init
const useAnchor = () => {
  new Anchor('.scroll-cover [data-anchor-target]')
}

onMounted(() => {
  useAnchor()
})
</script>

<template>
  <div class="scroll-cover space-lr">
    <div class="container">
      <div class="scroll-btn vertical" data-cotton="explore" data-anchor-target=".about-anchor">
        <span>SCROLL</span>
      </div>
    </div>
  </div>
</template>
