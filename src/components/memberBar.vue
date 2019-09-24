<template>
  <div style="width:100%;height:5.5rem;display:flex;border-bottom:1px solid #ececec">
    <div style="width:25%;display: flex;align-items: center;justify-content: center;">
      <img :src="imgSrc" style="width:4rem;height:4rem;border-radius: 50%;">
    </div>
    <div style="width:75%;display: flex;align-items: center;padding-left:0.5rem;font-size:1.1rem">
      {{memberName}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'memberBar.vue',
  props: {
    imgSrc: String,
    memberName: String
  }
}
</script>

<style scoped>

</style>
