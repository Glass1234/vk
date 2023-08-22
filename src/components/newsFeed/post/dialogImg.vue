<template>
  <v-card color="grey-darken-3" v-if="infoImg.user">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-img :src="infoImg.originalImg" cover/>
        <div class="d-flex">
          <template v-if="!infoImg.isSaved">
            <v-btn variant="text" @click="addSave()">
              <div class="text-caption text-grey-lighten-2">Сохранить к себе</div>
            </v-btn>
          </template>
          <template v-else>
            <div class="d-flex align-center">
              <div class="text-caption text-grey-darken-1">Фотография сохранена</div>
            </div>
          </template>
          <v-btn variant="text" @click="copyImg()" title="Скопировать">
            <v-img src="@/assets/icons/content_copy.svg" width="30" height="30"/>
          </v-btn>
          <v-btn variant="text" @click="downloadImg()" title="Скачать">
            <v-img src="@/assets/icons/download.svg" width="30" height="30"/>
          </v-btn>
          <v-btn variant="text" :href="infoImg.originalImg" target="_blank" title="Открыть оригинал">
            <v-img src="@/assets/icons/open_in_new.svg" width="30" height="30"/>
          </v-btn>
        </div>
      </div>
      <v-col class="px-0">
        <div class="d-flex flex-no-wrap align-center mx-2 pb-2" style="max-width: 250px">
          <div class="pointer rounded-circle" @click="this.$router.replace(`/id${infoImg.user.id}`)">
            <v-img :src="infoImg.user.photo_200" width="40" class="rounded-circle"/>
          </div>
          <div class="ml-1 pointer" @click="this.$router.replace(`/id${infoImg.user.id}`)">
            <div class="text-blue-lighten-1">{{ infoImg.user.name }}</div>
          </div>
        </div>
        <v-divider/>
        <div class="d-flex flex-no-wrap align-center mx-2">
          <div class="">
            <v-img src="@/assets/icons/favorite.svg" width="30" height="30"/>
          </div>
          <div>{{ infoImg.likesCount }}</div>
        </div>
        <v-divider/>
        <div class="text-caption" style="max-width: 300px" v-if="infoImg.text">
          <div class="pa-2 text-grey-lighten-2">
            {{ infoImg.text }}
          </div>
          <v-divider/>
        </div>
      </v-col>
    </div>
  </v-card>
</template>

<script>
import {api} from "@/api";

export default {
  name: "dialogImg",
  props: {
    srcImg: {
      required: true,
      type: Object
    },
  },
  async created() {
    this.infoImg.user = (await api.getGroupInfo(this.srcImg.owner_id)).data.response[0]
  },
  data() {
    return {
      infoImg: {
        isSaved: false,
        originalImg: this.getMaxSizePicture(this.srcImg),
        likes: this.srcImg.likes,
        likesCount: this.srcImg.likes.count,
        text: this.srcImg.text,
        user: {}
      },
      openedImg: {
        owner_id: this.srcImg.owner_id,
        photo_id: this.srcImg.id
      }
    }
  },
  methods: {
    getMaxSizePicture(item) {
      let index = 0;
      let maxSize = item.sizes[0].height + item.sizes[0].width
      for (let i = 0; i < item.sizes.length; i++) {
        const tmp = item.sizes[i].height + item.sizes[i].width
        if (maxSize < tmp) {
          maxSize = tmp
          index = i
        }
      }
      return item.sizes[index].url
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
    addSave() {
      this.infoImg.isSaved = true
      this.$emit('save', this.openedImg)
    },
  },
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
