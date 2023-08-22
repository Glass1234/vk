<template>
  <v-container>
    <template v-if="groups">
      <div class="mb-4" v-for="item in items" :key="item.post_id">
        <strip-post :owner="searchOwner(item.source_id)" :post="item"/>
      </div>
    </template>
  </v-container>
</template>

<script>
import StripPost from "@/components/newsFeed/post/StripPost.vue";
import {api} from "@/api";

export default {
  name: "feedStrip",
  components: {StripPost},
  created() {
    this.init()
  },
  data() {
    return {
      items: [],
      groups: [],
      isLoad: 0,
      nextFrom: 0
    }
  },
  methods: {
    searchOwner(source_id) {
      const id = source_id * -1
      const index = this.groups.findIndex((group) => group.id === id)
      return this.groups[index]
    },
    async getPosts(count = 15) {
      const res = (await api.getNewsFeed(0, count)).data.response
      this.items = res.items
      this.groups = res.groups
      this.nextFrom = res.next_from
    },
    async addPosts() {
      if (this.isLoad === 3) {
        return
      }
      this.isLoad = 1
      const res = (await api.getNewsFeed(this.nextFrom, 10)).data.response
      if (res.items.length === 0) {
        this.isLoad = 3
      }
      this.items = this.items.concat(res.items)
      this.groups = this.groups.concat(res.groups)
      this.nextFrom = res.next_from
      this.isLoad = 0
    },
    async init() {
      await Promise.all([
        this.getPosts()
      ])
    }
  }
}
</script>

<style scoped>

</style>
