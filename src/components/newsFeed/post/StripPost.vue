<template>
  <v-sheet class="pa-3 rounded" color="black" max-width="500">
    <header-post :name="owner.name" :photo="owner.photo_200" :date-time="post.date"/>
    <main-post :photos="photos"/>
    <footer-post :views="post.views.count" :comments="post.comments" :reposts="post.reposts" :likes="post.likes"
                 :owner_id="post.owner_id" :id="post.id"/>
  </v-sheet>
</template>

<script>
import HeaderPost from "@/components/newsFeed/post/headerPost.vue";
import MainPost from "@/components/newsFeed/post/mainPost.vue";
import FooterPost from "@/components/newsFeed/post/footerPost.vue";

export default {
  name: "StripPost",
  props: {
    owner: {
      required: true
    },
    post: {
      required: true
    }
  },
  computed: {
    photos() {
      let res = this.post.attachments.map((photo) => {
        if (photo.type === 'photo') {
          return {
            img: this.getMaxSizePicture(photo.photo),
            id: photo.photo.id
          }
        }
      })
      res = res.filter((item) => item !== undefined)
      return res
    }
  },
  methods: {
    getMaxSizePicture(item) {
      const lastIndex = item.sizes.length - 1
      return item.sizes[lastIndex].url
    }
  },
  components: {FooterPost, MainPost, HeaderPost}
}
</script>

<style scoped>
</style>
