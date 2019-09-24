<template>
  <div style="width:20%;height:6rem;display:flex;flex-direction:column;align-items: center;">
    <div style="width:4rem;height:4rem;display: flex;justify-content: center;align-items: center">
      <img :src=imgSrc style="width:3rem;height:3rem;border-radius:50%;">
    </div>
    <div style="width:3.5rem;height:2rem;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;font-size:0.8rem;">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'communityIcon.vue',
  props: {
    imgSrc: String,
    name: String
  }
}
</script>

<style scoped>

</style>
