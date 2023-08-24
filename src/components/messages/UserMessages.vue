<template>
  <v-container class="rounded bg-grey-darken-3">
    <v-text-field v-model="searchMsg" class="mx-2 mt-2" label="Поиск" variant="underlined"/>
    <template v-for="msg in msgs" :key="msg.conversation.peer.id">
      <item-msg :msg="msg" :companion="searchCompanion(msg.conversation.peer.id)"/>
    </template>
  </v-container>
</template>

<script>
import ItemMsg from "@/components/messages/itemMsg.vue";
import {api} from "@/api";

export default {
  name: "UserMessages",
  components: {ItemMsg},
  created() {
    this.init()
  },
  data() {
    return {
      searchMsg: '',
      msgs: [],
      profiles: [],
      groups: [],
      isLoad: 0
    }
  },
  methods: {
    searchCompanion(id) {
      let searchItem
      if (id > 0) {
        searchItem = this.profiles.findIndex((user) => {
          if (user.id === id) {
            return true
          }
        })
        searchItem = this.profiles[searchItem]
      } else {
        searchItem = this.groups.findIndex((group) => {
          if (group.id === id * -1) {
            return true
          }
        })
        searchItem = this.groups[searchItem]
      }
      return searchItem
    },
    async addMsgs() {
      if (this.isLoad === 3) {
        return
      }
      this.isLoad = 1
      const res = (await api.getChatsUser(this.msgs.length, 20)).data.response
      if (res.items.length === 0) {
        this.isLoad = 3
      }
      if (res?.items) {
        this.msgs = this.msgs.concat(res.items)
      }
      if (res?.profiles) {
        this.profiles = this.profiles.concat(res.profiles)
      }
      if (res?.groups) {
        this.groups = this.groups.concat(res.groups)
      }
      this.isLoad = 0
    },
    async getMsgs() {
      const res = (await api.getChatsUser(0, 20)).data.response
      this.msgs = res.items
      this.profiles = res.profiles
      this.groups = res.groups
    },
    async init() {
      await Promise.all([
        this.getMsgs()
      ])
    }
  }
}
</script>

<style scoped>

</style>
