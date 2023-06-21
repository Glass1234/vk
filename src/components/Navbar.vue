<template>
  <v-app-bar color="grey-darken-3">
    <v-container>
      <v-row class="align-center">
        <v-btn icon>
          <v-img src="@/assets/icons/notifications.svg"/>
        </v-btn>
        <v-btn icon class="ml-3">
          <v-img src="@/assets/icons/music.svg"/>
        </v-btn>
        <v-spacer/>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="outlined" size="large" ref="menu_avatar"
                   @click="menu_is_opened=!menu_is_opened"
            >
              <v-row class="align-center">
                <v-img class="rounded-circle" height="32px" :src="user.photo"/>
                <span class="ml-3">{{ user.first_name + ' ' + user.last_name }}</span>
                <v-img :style="{'transform':'rotate('+(menu_is_opened ? 180 : 0)+'deg)'}"
                       height="25px" src="@/assets/icons/expand.svg"/>
              </v-row>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item,i) in menu_item"
                :key="i"
                :value="item"
                color="indigo-accent-4"
            >
              <template v-slot:prepend>
                <v-img :src="item.path" width="32px"/>
              </template>
              <v-list-item-title class="ml-3">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>

  </v-app-bar>
</template>

<script>


import store from "@/store";

export default {
  name: 'NavBar',
  created() {
    this.user.first_name = store.state.user.first_name
    this.user.last_name = store.state.user.last_name
    this.user.photo = store.state.user.photo_200
  },
  data() {
    return {
      menu_is_opened: false,
      menu_item: [
        {'name': 'Настройки', 'path': require('@/assets/icons/settings.svg')},
        {'name': 'Выйти', 'path': require('@/assets/icons/logout.svg')},
      ],
      user: {
        'first_name': '',
        'last_name': '',
        'photo': ''
      },
    }
  },
}
</script>

<style scoped>

</style>