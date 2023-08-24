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
          <user-messages ref="messagesScroll"/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import UserMessages from "@/components/messages/UserMessages.vue";

export default {
  name: "MessagesPage",
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods:{
    handleScroll() {
      if ((this.$refs.messagesScroll.$el.getBoundingClientRect().bottom < window.innerHeight + 200)
          && this.$refs.messagesScroll.isLoad === 0) {
        this.$refs.messagesScroll.addMsgs()
      }
    },
  },
  components: {UserMessages, SideBar}
}
</script>

<style scoped>

</style>
