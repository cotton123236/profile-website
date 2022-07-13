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
  <li class="each-project">
    <a :href="project.href" target="_blank" data-cotton="explore">
      <div class="info">
        <div class="title">{{ project.title }}</div>
        <div class="brief" v-html="project.brief"></div>
      </div>
      <div class="tech" v-html="project.tech"></div>
    </a>
    <!-- <div class="photo-box" ref="projectPhoto">
      <div class="photo">
        <img :src="project.image" alt="">
      </div>
    </div> -->
  </li>
</template>
