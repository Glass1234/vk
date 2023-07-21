<template>
  <v-container class="rounded bg-grey-darken-3">
    <v-row>
      <v-col cols="12" md="2" class="pa-1"
             v-for="img in images" :key="img.id">
        <ItemAlbum :ids="img.id" :url="getMaxSizePicture(img)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {api} from "@/data/vkApi";
import ItemAlbum from "@/components/album/ItemAlbum.vue";

export default {
  name: 'Album_',
  components: {ItemAlbum},
  props: {
    albumId: {
      required: true,
      type: String
    },
    ownerId: {
      required: true,
      type: String
    }
  },
  created() {
    this.init()
  },
  data() {
    return {images: []}
  },
  methods: {
    getMaxSizePicture(item) {
      const lastIndex = item.sizes.length - 1
      return item.sizes[lastIndex].url
    },
    async init() {
      const res = (await api.getPhotoFromAlbum(this.albumId, this.ownerId,0,50)).data.response.items
      this.images = this.images.concat(res)
    }
  }
}

</script>

<style scoped>

</style>