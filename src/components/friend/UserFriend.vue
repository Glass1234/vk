<template>
  <v-container class="rounded bg-grey-darken-3">
    <v-tabs
        v-model="tab"
        bg-color="grey-darken-2"
        class="rounded"
    >
      <v-tab value="all">
        <div class="text-subtitle-1">Все друзья <span class="text-caption text-light-green">{{
            allPeople.length
          }}</span>
        </div>
      </v-tab>
      <v-tab value="online">
        <div class="text-subtitle-1">Друзья онлайн <span class="text-caption text-yellow">{{
            onlinePeople.length
          }}</span>
        </div>
      </v-tab>
    </v-tabs>
    <v-text-field v-model="inputSearch" class="mx-2 mt-2" label="Поиск друзей" variant="underlined"></v-text-field>
    <v-window v-model="tab" class="rounded">
      <v-window-item value="all" class="py-1">
        <template v-for="item in searchPeople(allPeople,inputSearch)" :key="item.id">
          <item-user :user="item"/>
        </template>
      </v-window-item>
      <v-window-item value="online">
        <template v-for="item in searchPeople(onlinePeople, inputSearch)" :key="item.id">
          <item-user :user="item"/>
        </template>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import ItemUser from "@/components/friend/itemUSer.vue";
import store from "@/store";
import {api} from "@/api/index.js"

export default {
  name: 'UserFriend',
  components: {ItemUser},
  created() {
    this.init()
    this.tab = this.$route.query.section
  },
  watch:{
    '$route.params'(){
      this.init()
    }
  },
  data() {
    return {
      tab: null,
      allPeople: {},
      onlinePeople: {},
      inputSearch: '',
      idSearch: store.state.user.id
    }
  },
  methods: {
    searchPeople(users, name) {
      if (name === '') {
        return users
      }
      const fullName = name.toLowerCase().replaceAll(' ', '')
      return users.filter(user =>
          (user.first_name + user.last_name).toLowerCase().replaceAll(' ', '').indexOf(fullName) !== -1
      )
    },
    async getAllPeople() {
      this.allPeople = (await api.getUserPeople(this.idSearch)).data.response
      this.allPeople = (await api.getUsersMin(this.allPeople.items)).data.response
    },
    async getOnlinePeople() {
      this.onlinePeople = (await api.getFriendsOnline(this.idSearch)).data.response
      this.onlinePeople = (await api.getUsersMin(this.onlinePeople.online + this.onlinePeople.online_mobile)).data.response
    },
    async init() {
      if (this.$route.query?.id) {
        this.idSearch = this.$route.query.id
      }else {this.idSearch = store.state.user.id}
      await Promise.all([
        this.getAllPeople(),
        this.getOnlinePeople()
      ])
    }
  }
}
</script>

<style scoped>

</style>