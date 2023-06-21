<template>
  <v-list border rounded>
    <v-list-item v-for="(item,i) in items" :key="i" :value="item"
                 color="black" @click=goPage(item.to)>
      <template v-slot:prepend>
        <v-img :src="item.path" width="28px"/>
      </template>
      <v-list-item-title class="ml-3">{{ item.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import store from "@/store";

export default {
  name: 'SideBar',
  mounted() {
    console.log()
  },
  data() {
    return {
      items: [
        {name: 'Моя страница', path: require('@/assets/icons/account.svg'), to: `id${store.state.user.id}`},
        {name: 'Новости', path: require('@/assets/icons/newspaper.svg'), to: ''},
        {name: 'Мессенджер', path: require('@/assets/icons/chat.svg'), to: ''},
        {name: 'Друзья', path: require('@/assets/icons/group.svg'), to: ''},
        {name: 'Фотографии', path: require('@/assets/icons/image.svg'), to: ''},
      ]
    }
  },
  methods: {
    goPage(url) {
      console.log(url)
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>

</style>