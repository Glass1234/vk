<template>
  <v-container class="rounded bg-grey-darken-3">
    <div class="d-flex">
      <div v-if="albumInfo.fullName">{{ albumInfo.fullName }}</div>
      <div v-if="albumInfo.albumName" class="ml-2">{{ albumInfo.albumName }}</div>
    </div>
    <RecycleScroller
        ref="forScroller"
        emit-update
        class="scroller"
        :items="images"
        :item-size="200"
        v-slot="{ item, index }"
        pageMode
        :gridItems="4"
        itemClass=''
    >
      <ItemAlbum :ids="item.id" :url="getMaxSizePicture(item)" @click="setInfoPhoto(item, index)"/>
    </RecycleScroller>
    <v-dialog class="v-dialog" v-model="dialog" color="bg-grey-darken-3" width="auto" max-height="80%">
      <dialog-img @save="addSave" @delPhoto="deletePhoto" @delLike="deleteLike" @setLike="setLike"
                  :opened-img="openedImg" :info-img="infoImg"/>
    </v-dialog>
  </v-container>
</template>

<script>
import {api} from "@/api/index.js"
import {RecycleScroller} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import ItemAlbum from "@/components/album/ItemAlbum.vue";
import {ref} from 'vue'
import DialogImg from "@/components/album/dialogImg.vue";

export default {
  name: 'Album_',
  components: {DialogImg, ItemAlbum, RecycleScroller},
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
  setup() {
    const forScroller = ref(null)
    return {forScroller}
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.infoImg.isSaved = false
        this.infoImg.isDeleted = false
      }
    }
  },
  data() {
    return {
      albumInfo: {
        fullName: '',
        albumName: '',
      },
      images: [], isLoad: 0,
      dialog: false, openedImg: null, infoImg: {
        allCount: 0,
        thisCount: 0,
        likesCount: 0,
        user_like: 0,
        text: '',
        isSaved: false,
        isDeleted: false,
        originalImg: '',
        user: null
      }
    }
  },
  methods: {
    getMaxSizePicture(item) {
      const lastIndex = item.sizes.length - 1
      return item.sizes[lastIndex].url
    },
    scrollerUpdate() {
      this.forScroller?.updateVisibleItems(true)
    },
    downloadImg() {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let context = canvas.getContext('2d');

        context.drawImage(img, 0, 0);

        canvas.toBlob(function (blob) {
          let link = document.createElement('a');
          link.download = 'image.png';

          link.href = URL.createObjectURL(blob);
          link.click();

          URL.revokeObjectURL(link.href);
        }, 'image/png');
      };
      img.src = this.infoImg.originalImg
    },
    copyImg() {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let context = canvas.getContext('2d');

        context.drawImage(img, 0, 0);

        canvas.toBlob(function (blob) {
          let newImg = new Image();

          newImg.src = URL.createObjectURL(blob);

          let clipboardItem = new ClipboardItem({'image/png': blob});

          navigator.clipboard.write([clipboardItem]).then(function () {
            console.log('Image copied to clipboard!');
          }, function (error) {
            console.error('Unable to copy image: ', error);
          });
        }, 'image/png', 1);
      };
      img.src = this.infoImg.originalImg // URL изображения
    },
    async setLike(item) {
      const res = (await api.setLikePhoto(item.owner_id, item.id))
      if (!res.data?.error) {
        this.infoImg.user_like = 1
        this.infoImg.likesCount += 1
      }
    },
    async deleteLike(item) {
      const res = (await api.deleteLikePhoto(item.owner_id, item.id))
      if (!res.data?.error) {
        this.infoImg.user_like = 0
        this.infoImg.likesCount -= 1
      }
    },
    async addSave(item) {
      const res = (await api.addPhotoInSavedAlbum(item.owner_id, item.id))
      if (!res.data?.error) {
        this.infoImg.isSaved = true
      }
    },
    async deletePhoto(item) {
      const res = (await api.deletePhotoInAlbum(item.owner_id, item.id)).data.response
      if (res === 1) {
        this.infoImg.isDeleted = true
        let searchIndex = this.images.findIndex((img) => img.id === item.id)
        this.images.splice(searchIndex, 1)
        this.scrollerUpdate()
      }
    },
    async setInfoPhoto(item, index) {
      this.dialog = !this.dialog
      this.openedImg = item
      this.infoImg.thisCount = index + 1
      let res = (await api.getInfoPhoto(item.owner_id, item.id)).data.response[0]
      this.infoImg.likesCount = res.likes.count
      this.infoImg.user_like = res.likes.user_likes
      this.infoImg.text = res.text
      this.infoImg.originalImg = res.orig_photo.url
      res = (await api.getFriendInfo(res.owner_id)).data.response[0]
      this.infoImg.user = res
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
    async getFirstPhoto() {
      const res = (await api.getPhotoFromAlbum(this.albumId, this.ownerId, 0, 50)).data.response
      this.infoImg.allCount = res.count
      this.images = this.images.concat(res.items)
    },
    async getInfoUser() {
      const res = (await api.getUsersMin(this.ownerId)).data.response[0]
      this.albumInfo.fullName = res.first_name + ' ' + res.last_name
    },
    async getNameAlbum() {
      if (isNaN(parseInt(this.albumId))) {
        this.albumInfo.albumName = this.albumId
      } else {
        const res = (await api.getAlbums(this.ownerId)).data.response.items
        this.albumInfo.albumName = res.find((item) => item.id == this.albumId).title
        console.log(this.albumInfo.albumName);
      }
    },
    async init() {
      await Promise.all([
        this.getFirstPhoto(),
        this.getInfoUser(),
        this.getNameAlbum()
      ])
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

.pointer {
  cursor: pointer;
}
</style>
