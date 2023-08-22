<template>
  <v-row class="justify-center">
    <div class="w-100 px-2 pb-2">
      {{ textPost }}
    </div>
    <div class="customGrid" :style="{'border-left':isCopyPost?'aqua solid 4px':''}" v-if="photos.length">
      <div class="container border" v-for="photo in photos" :key="photo.id"
           @click="setPhotoInDialog(photo.owner_id,photo.id)">
        <v-img v-if="photo" :src="photo.img" width="200" height="200" cover=""/>
      </div>
    </div>
  </v-row>
  <v-dialog class="v-dialog" v-model="dialog" color="bg-grey-darken-3" width="auto" max-height="80%">
    <dialog-img :src-img="setImg" @save="addSave"/>
  </v-dialog>
</template>

<script>
import DialogImg from "@/components/newsFeed/post/dialogImg.vue";
import {api} from "@/api";

export default {
  name: "mainPost",
  components: {DialogImg},
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
  data() {
    return {dialog: false, setImg: null}
  },
  methods: {
    async setPhotoInDialog(owner_id, photo_id) {
      this.setImg = (await api.getInfoPhoto(owner_id, photo_id)).data.response[0]
      this.dialog = !this.dialog
    },
    async addSave(data) {
      await api.addPhotoInSavedAlbum(data.owner_id, data.photo_id)
    }
  }
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
