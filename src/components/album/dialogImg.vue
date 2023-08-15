<template>
  <v-card color="grey-darken-3" v-if="infoImg.user">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-img :src="getMaxSizePicture(openedImg)" cover/>
        <div class="d-flex">
          <div class="d-flex align-center pa-1 pl-3" style="width: fit-content">
            <div>{{ infoImg.thisCount }}</div>
            <v-card-text class="pa-0 mx-1 d-block text-grey-darken-1">из</v-card-text>
            <div>{{ infoImg.allCount }}</div>
          </div>
          <v-spacer/>
          <template v-if="!infoImg.isSaved">
            <v-btn variant="text" @click="addSave(openedImg)">
              <div class="text-caption text-grey-lighten-2">Сохранить к себе</div>
            </v-btn>
          </template>
          <template v-else>
            <div class="d-flex align-center">
              <div class="text-caption text-grey-darken-1">Фотография сохранена</div>
            </div>
          </template>
          <template v-if="!infoImg.isDeleted">
            <v-btn variant="text" title="Удалить фото" @click="deletePhoto(openedImg)">
              <v-img src="@/assets/icons/delete.svg" width="30" height="30"/>
            </v-btn>
          </template>
          <template v-else>
            <div class="d-flex align-center">
              <div class="text-caption text-grey-darken-1">Фотография удалена</div>
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
        <div class="d-flex flex-no-wrap align-center mx-2 pb-2">
          <div class="pointer rounded-circle" @click="this.$router.replace(`/id${infoImg.user.id}`)">
            <v-img :src="infoImg.user.photo_200" width="40" class="rounded-circle"/>
          </div>
          <div class="ml-1 pointer" @click="this.$router.replace(`/id${infoImg.user.id}`)">
            <div class="text-blue-lighten-1">{{ infoImg.user.first_name + ' ' + infoImg.user.last_name }}</div>
          </div>
        </div>
        <v-divider/>
        <div class="d-flex flex-no-wrap align-center mx-2">
          <template v-if="infoImg.user_like">
            <div class="pointer" @click="deleteLike(openedImg)">
              <v-img src="@/assets/icons/favoriteFill.svg" width="30" height="30"/>
            </div>
          </template>
          <template v-else>
            <div class="pointer" @click="setLike(openedImg)">
              <v-img src="@/assets/icons/favorite.svg" width="30" height="30"/>
            </div>
          </template>
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
export default {
  name: "dialogImg",
  props: {
    infoImg: {
      required: true,
      type: Object
    },
    openedImg: {
      required: true,
      type: Object
    }
  },
  methods: {
    getMaxSizePicture(item) {
      const lastIndex = item.sizes.length - 1
      return item.sizes[lastIndex].url
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
    addSave(openedImg) {
      this.$emit('save', openedImg)
    },
    deletePhoto(openedImg){
      this.$emit('delPhoto', openedImg)
    },
    deleteLike(openedImg){
      this.$emit('delLike', openedImg)
    },
    setLike(openedImg){
      this.$emit('setLike', openedImg)
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
