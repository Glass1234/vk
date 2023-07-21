<template>
  <v-sheet :height="200" style="overflow: hidden" class="container rounded bg-black">
      <v-img height="200" :src="url" cover/>
  </v-sheet>
</template>

<script>
export default {
  name:'ItemAlbum',
  props:{
    url:{
      required:true,
      type:String
    },
    ids:{
      required: true,
    }
  }
}

</script>

<style scoped>
.container {
  position: relative;
  cursor: pointer;
}

.container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  transition: opacity 0.2s;
  opacity: 0;
}

.container:hover::after {
  opacity: 1;
}
</style>