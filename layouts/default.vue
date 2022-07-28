<script setup>
import DeviceDetector from 'device-detector-js'


const checkIsApple = () => {
  const deviceDetector = new DeviceDetector()
  const userAgent = navigator.userAgent
  const device = deviceDetector.parse(userAgent)
  // console.log('%cdefault.vue line:9 device', 'color: #007acc;', device);
  if (device.device.brand === 'Apple') return;
  document.body.classList.add('scrollbar-style')
}

onMounted(() => {
  checkIsApple()
})
</script>

<template>
  <div class="__nuxt-wrapper">
    <h1 class="sr-only">Wilson's Profile & Works</h1>
    <Header />
    <Menu />
    <slot></slot>
    <Footer />
  </div>
</template>