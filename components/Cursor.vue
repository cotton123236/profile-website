<script setup>
const { Cotton } = useNuxtApp()

onMounted(() => {
  new Cotton('.cursor', {
    models: '[data-cotton]',
    on: {
      enterModel(cursor, model) {
        if (!model) return;
        const modelType = model.getAttribute('data-cotton')
        if (modelType === 'explore') cursor.classList.add('explore')
      },
      leaveModel(cursor, model) {
        if (!model) return;
        const modelType = model.getAttribute('data-cotton')
        if (modelType === 'explore') cursor.classList.remove('explore')
      }
    }
  })
})
</script>

<template>
  <div class="cursor">
    <div class="cursor-ball"></div>
  </div>
</template>