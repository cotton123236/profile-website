<script setup>
const { Anchor } = useNuxtApp()

// Anchor init
const useAnchor = () => {
  new Anchor('footer [data-anchor-target]')
}

onMounted(() => {
  useAnchor()
})
</script>

<template>
  <footer>
    <div class="scroll-btn" data-anchor-target="">
      <span>TOP</span>
    </div>
  </footer>
</template>