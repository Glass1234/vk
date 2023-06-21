<template>
  <v-app color="black">
    <NavBar/>
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
}
</script>
