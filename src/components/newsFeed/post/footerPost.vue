<template>
  <v-row>
    <template v-if="true">
      <template v-if="actions.likes.user_likes===0 && isLiked===false">
        <v-btn variant="text" title="Поставить лайк" @click="setLike">
          <v-img :src="require('@/assets/icons/favorite.svg')" width="30" height="30"/>
          <div>{{ actions.likes.count + isLiked}}</div>
        </v-btn>
      </template>
      <template v-else>
        <v-btn variant="text" title="Убрать лайк" @click="deleteLike">
          <v-img :src="require('@/assets/icons/favoriteFill.svg')" width="30" height="30"/>
          <div>{{ actions.likes.count + isLiked}}</div>
        </v-btn>
      </template>
    </template>
    <v-btn variant="text" title="Коментарий">
      <v-img :src="require('@/assets/icons/chatGray.svg')" width="30" height="30"/>
      <div>{{ actions.comments.count }}</div>
    </v-btn>
    <v-btn variant="text" title="Поделиться">
      <v-img :src="require('@/assets/icons/reply.svg')" width="30" height="30"/>
      <div>{{ actions.reposts.count }}</div>
    </v-btn>
    <v-spacer/>
    <v-btn variant="text" title="Просмотров" disabled>
      <v-img :src="require('@/assets/icons/visibility.svg')" width="30" height="30"/>
      <div>{{ actions.views }}</div>
    </v-btn>
  </v-row>
</template>

<script>
import {api} from "@/api";

export default {
  name: "footerPost",
  props: {
    actions: {
      required: true,
      type: Object,
      views: {
        required: true,
        type: Number
      },
      comments: {
        required: true,
        type: Object
      },
      reposts: {
        required: true,
        type: Object
      },
      likes: {
        required: true,
        type: Object
      },
    },
    ids: {
      required: true,
      type: Object,
      owner_id: {
        required: true,
        type: Number
      },
      id: {
        required: true,
        type: Number
      }
    }
  },
  data() {
    return {isLiked: false}
  },
  methods: {
    async setLike() {
      const res = (await api.setLikePost(this.ids.owner_id, this.ids.id))
      if (!res.data?.error) {
        this.isLiked = true
      }
    },
    async deleteLike() {
      const res = (await api.deleteLikePost(this.ids.owner_id, this.ids.id))
      if (!res.data?.error) {
        this.isLiked = false
      }
    },
  }
}
</script>

<style scoped>

</style>
