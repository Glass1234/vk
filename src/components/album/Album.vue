<template>
  <v-container class="rounded bg-grey-darken-3">
    <RecycleScroller
        class="scroller"
        :items="images"
        :item-size="200"
        v-slot="{ item }"
        pageMode
        gridItems="4"
        itemClass=''
    >
      <ItemAlbum :ids="item.id" :url="getMaxSizePicture(item)" @click="dialog=!dialog;openedImg=item"/>
    </RecycleScroller>
    <v-dialog class="v-dialog" v-model="dialog" width="auto" color="bg-grey-darken-3">
      <v-card class="mx-auto" color="grey-darken-3">
        <v-img :src="getMaxSizePicture(openedImg)" cover/>
        <v-card-subtitle>123</v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {api} from "@/data/vkApi";
import {RecycleScroller} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import ItemAlbum from "@/components/album/ItemAlbum.vue";

export default {
  name: 'Album_',
  components: {ItemAlbum, RecycleScroller},
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
    return {
      images: [], isLoad: 0,
      dialog: false, openedImg: null
    }
  },
  methods: {
    getMaxSizePicture(item) {
      const lastIndex = item.sizes.length - 1
      return item.sizes[lastIndex].url
    },
    async addImages() {
      if (this.isLoad === 3) {
        return
      }
      this.isLoad = 1
      const res = (await api.getPhotoFromAlbum(this.albumId, this.ownerId, this.images.length, 50)).data.response.items
      if (res.length === 0) {
        this.isLoad = 3
      }
      this.images = this.images.concat(res)
      this.isLoad = 0
    },
    async init() {
      const res = (await api.getPhotoFromAlbum(this.albumId, this.ownerId, 0, 50)).data.response.items
      this.images = this.images.concat(res)
    }
  },
}

</script>

<style scoped>
.v-dialog :deep(.v-overlay__scrim) {
  opacity: 0.7;
}

.scroller {
  height: 100%;
}

.vue-recycle-scroller__item-wrapper {
  display: none
}
</style>