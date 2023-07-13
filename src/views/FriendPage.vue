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
          <UserFriend/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import UserFriend from "@/components/friend/UserFriend.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: 'FriendPage',
  components: {SideBar, UserFriend}
}
</script>
<style scoped>

</style>