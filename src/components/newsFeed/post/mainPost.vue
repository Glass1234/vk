<template>
  <v-row class="justify-center">
    <div class="w-100 px-2 pb-2">
      {{ textPost }}
    </div>
    <div class="customGrid" :style="{'border-left':isCopyPost?'aqua solid 4px':''}" v-if="photos.length">
      <div class="container border" v-for="photo in photos" :key="photo.id">
        <v-img v-if="photo" :src="photo.img" width="200" height="200" cover=""/>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {
  name: "mainPost",
  props: {
    photos: {
      required: false,
      type: Array
    },
    textPost: {
      required: false,
      type: String
    },
    isCopyPost: {
      required: false,
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
.customGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

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
