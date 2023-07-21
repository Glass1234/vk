<template>
  <v-container class="rounded bg-grey-darken-3">
    <v-list class="bg-grey-darken-3 py-0">
      <v-list-item class="pa-0">
        <template v-if="fullName">
          <template v-if="this.$route.query?.id === undefined">
            <div class="text-h6 font-weight-regular">
              Мои альбомы <span class="text-body-2 font-weight-light">{{ countAlbums() }}</span>
            </div>
          </template>
          <template v-else>
            <div class="text-h6 font-weight-regular">
              {{ fullName.first_name + ' ' + fullName.last_name }} <span
                class="text-body-2 font-weight-light">{{ countAlbums() }}</span>
            </div>
          </template>
        </template>
      </v-list-item>
      <v-divider/>
      <v-list-item class="px-0" v-if="fullName">
        <v-row>
          <v-col cols="12" md="3" class="px-0" v-if="profileAlbum && profileAlbum.count">
            <v-container>
              <AlbumCard :url="getMaxSizePicture(profileAlbum)" name="Фото профиля" album-id="profile"
                         :count="profileAlbum.count" :owner-id="fullName.id"/>
            </v-container>
          </v-col>
          <v-col cols="12" md="3" class="px-0" v-if="wallAlbum && wallAlbum.count">
            <v-container>
              <AlbumCard :url="getMaxSizePicture(wallAlbum)" :name="'Фотографии на стене '+fullName.first_name"
                         album-id="wall" :count="wallAlbum.count" :owner-id="fullName.id"/>
            </v-container>
          </v-col>
          <v-col cols="12" md="3" class="px-0" v-if="savedAlbum && savedAlbum.count">
            <v-container>
              <AlbumCard :url="getMaxSizePicture(savedAlbum)" :name="'Сохронённые фото '+fullName.first_name"
                         album-id="saved" :count="savedAlbum.count" :owner-id="fullName.id"/>
            </v-container>
          </v-col>
        </v-row>
      </v-list-item>
      <template v-if="otherAlbums && otherAlbums.length">
        <v-list-item class="px-0" v-if="fullName">
          <v-divider/>
          <v-row class="pt-4">
            <v-col cols="12" md="3" class="pa-0"
                   v-for="album in otherAlbums" :key="album.info.id">
              <v-container v-if="album.img.count">
                <AlbumCard :url="getMaxSizePicture(album.img)" :name="album.info.title"
                           :album-id="album.info.id" :count="album.img.count" :owner-id="fullName.id"/>
              </v-container>
              <v-container v-else>
                <AlbumCard :name="album.info.title" :count="album.img.count"
                           :album-id="album.info.id" :owner-id="fullName.id"/>
              </v-container>
            </v-col>
          </v-row>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import {api} from "@/data/vkApi";
import store from "@/store";
import AlbumCard from "@/components/albums/AlbumCard.vue";

export default {
  name: 'UserAlbums',
  components: {AlbumCard},
  async created() {
    const id = this.$route.query?.id ? this.$route.query?.id : store.state.user.id
    await this.init(id)
  },
  watch: {
    '$route.params'() {
      const id = store.state.user.id
      this.init(id)
    }
  },
  data() {
    return {
      otherAlbums: null,
      wallAlbum: null,
      profileAlbum: null,
      savedAlbum: null,
      fullName: null
    }
  },
  methods: {
    countAlbums() {
      let count = this.otherAlbums.length
      count = this.wallAlbum?.count ? count + 1 : count
      count = this.profileAlbum?.count ? count + 1 : count
      count = this.savedAlbum?.count ? count + 1 : count
      return count
    },
    getMaxSizePicture(item) {
      const lastIndex = item.items[0].sizes.length - 1
      return item.items[0].sizes[lastIndex].url
    },
    async getOtherAlbums(id) {
      this.otherAlbums = (await api.getAlbums(id)).data.response
    },
    async getWallAlbum(id) {
      this.wallAlbum = (await api.getWallAlbum(id)).data.response
    },
    async getProfileAlbum(id) {
      this.profileAlbum = (await api.getProfileAlbum(id)).data.response
    },
    async getSavedAlbum(id) {
      this.savedAlbum = (await api.getSavedAlbum(id)).data.response
    },
    async getFullName(id) {
      this.fullName = (await api.getUsersMin(id)).data.response[0]
    },
    async getPicture(id, album_id) {
      return (await api.getLastPictureAlbums(id, album_id)).data.response
    },
    async init(id) {
      await Promise.all([
        this.getOtherAlbums(id),
        this.getWallAlbum(id),
        this.getProfileAlbum(id),
        this.getSavedAlbum(id),
      ])
      await this.getFullName(id)
      let tmp = []
      this.otherAlbums.items.forEach((item) => {
        tmp.push(item.id)
      })
      const res = await Promise.all(tmp.map(item => this.getPicture(id, item)))
      tmp = Object.assign([], this.otherAlbums)
      this.otherAlbums = []
      for (let i = 0; i < res.length; i++) {
        const data = {
          info: tmp.items[i],
          img: res[i]
        }
        this.otherAlbums.push(data)
      }
    }
  },
}
</script>

<style scoped>

</style>