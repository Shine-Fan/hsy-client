<template>
  <div class="community-bar row" style="margin:0;padding: 0.5rem 0;border-bottom: 1px solid #ddd;" @click="clickItem(item.sectionId)">
    <div class="col-3" style="display:flex;justify-content:flex-start;align-items:center;padding:0;">
      <img :src="item.src" style="width:3.5rem;height:3.5rem">
    </div>
    <div class="col-9" style="display:flex;flex-direction:column;justify-content:space-around;padding:0;">
      <div style="color: black;font-size:1rem">{{item.groupName}}</div>
      <div style="width:100%;color:#888;display:flex;justify-content: space-between;align-items: center;">
        <div style="font-size:0.8rem;width:70%;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;color:#888">{{item.summary}}</div>
        <div style="justify-content:flex-end;font-size:0.8rem;color:#888">成员 {{item.likes}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'communityBar.vue',
  props: {
    item: Object
  },
  methods: {
    clickItem: function (id) {
      this.$emit('toCertainCommuntiy', id)
    }
  }
}
</script>

<style scoped>

</style>
