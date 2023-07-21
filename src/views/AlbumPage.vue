<template>
  <v-main class="bg-blue-grey-darken-4">
    <v-container>
      <v-row class="flex-child text-subtitle-2">
        <v-col class="d-flex" cols="3" xxl="2">
          <v-sheet class="d-flex"
                   color="grey-darken-2"
                   :elevation="24"
                   border
                   rounded
                   max-height="260">
            <SideBar/>
          </v-sheet>
        </v-col>
        <v-col class="d-flex">
          <Album_ :album-id="album_id" :owner-id="owner_id" ref="albumScroll"/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Album_ from "@/components/album/Album.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: 'AlbumPage',
  created() {
    this.album_id = this.$route.params.album_id
    this.owner_id = this.$route.params.id
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      album_id: null,
      owner_id: null
    }
  },
  methods: {
    handleScroll() {
      if ((this.$refs.albumScroll.$el.getBoundingClientRect().bottom < window.innerHeight + 200)
          && this.$refs.albumScroll.isLoad === 0) {
        this.$refs.albumScroll.addImages()
      }
    },
  },
  components: {Album_, SideBar},
}

</script>

<style scoped>

</style>