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
    <v-window v-model="tab" class="rounded">
      <v-window-item value="all" class="py-1">
        <template v-for="item in allPeople" :key="item.id">
          <item-user :user="item"/>
        </template>
      </v-window-item>
      <v-window-item value="online">
        <template v-for="item in onlinePeople" :key="item.id">
          <item-user :user="item"/>
        </template>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import ItemUser from "@/components/friend/itemUSer.vue";
import store from "@/store";
import {api} from "@/data/vkApi";

export default {
  name: 'UserFriend',
  components: {ItemUser},
  created() {
    this.init()
    this.tab = this.$route.query.section
  },
  data() {
    return {
      tab: null,
      allPeople: {},
      onlinePeople: {},
      idSearch: store.state.user.id
    }
  },
  methods: {
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
      }
      console.log(this.idSearch)
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