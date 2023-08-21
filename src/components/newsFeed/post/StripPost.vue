<template>
  <v-sheet class="pa-3 rounded" color="black" max-width="500">
    <header-post :name="owner.name" :photo="owner.photo_200" :date-time="post.date"/>
    <main-post :photos="photos" :text-post="post.text" :is-copy-post="isCopyPost"/>
    <footer-post :actions="actionsButtons" :ids="ids"/>
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
    isCopyPost() {
      return !!this.post?.copy_history;
    },
    photos() {
      let res = []
      if (this.post.attachments.length) {
        res = this.post.attachments
      } else if (this.post.copy_history[0].attachments.length) {
        res = this.post.copy_history[0].attachments
      }
      if (res.length) {
        res = res.map((photo) => {
          if (photo.type === 'photo') {
            return {
              img: this.getMaxSizePicture(photo.photo),
              id: photo.photo.id
            }
          }
        })
        res = res.filter((item) => item !== undefined)
      }
      return res
    },
    ids() {
      return {
        owner_id: this.post.owner_id,
        id: this.post.id
      }
    },
    actionsButtons() {
      return {
        views: this.post.views.count,
        comments: this.post.comments,
        reposts: this.post.reposts,
        likes: this.post.likes
      }
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
