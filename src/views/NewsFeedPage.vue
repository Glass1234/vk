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
          <feed-strip ref="feedScroll"/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import FeedStrip from "@/components/newsFeed/Strip.vue";

export default {
  name: "NewsFeedPage",
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if ((this.$refs.feedScroll.$el.getBoundingClientRect().bottom < window.innerHeight + 200)
          && this.$refs.feedScroll.isLoad === 0) {
        this.$refs.feedScroll.addPosts()
      }
    },
  },
  components: {FeedStrip, SideBar}
}
</script>

<style scoped>

</style>
