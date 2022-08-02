<script setup>
defineProps({
  project: Object
})

const projectPhoto = ref(null)
const { Cotton } = useNuxtApp()

const useProjectPhoto = () => {
  new Cotton(projectPhoto.value, {
    scene: '.projects .block-content',
    speed: 0.3
  })
}

onMounted(() => {
  // useProjectPhoto()
})
</script>

<template>
  <li class="each-project" data-aos>
    <div class="inner">
      <a :href="project.href" target="_blank" data-cotton="explore">
        <div class="info">
          <div class="title">{{ project.title }}</div>
          <div class="brief" v-html="project.brief"></div>
        </div>
        <div class="tech" v-html="project.tech"></div>
      </a>
    </div>
  </li>
</template>
