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
          <UserProfile/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import UserProfile from "@/components/user/UserProfile.vue";

export default {
  name: 'UserProfilePage',
  components: {UserProfile, SideBar},
}
</script>

<style scoped>

</style>