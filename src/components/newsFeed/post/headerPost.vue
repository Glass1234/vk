<template>
  <v-row class="pa-2">
    <div>
      <v-img :src="photo" width="50" height="50" class="rounded-circle"/>
    </div>
    <v-col class="ml-2">
      <v-row>{{ name }}</v-row>
      <v-row>
        <div>
          {{ newTime?.hours }} : {{ newTime?.minutes }}
        </div>
        <div class="ml-2">
          {{ newTime?.days }}.{{ newTime?.month }}.{{ newTime?.years }}
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {convertDate} from "@/utils";

export default {
  name: "headerPost",
  props: {
    name: {
      required: true,
      type: String
    },
    photo: {
      required: true,
      type: String
    },
    dateTime: {
      required: true,
      type: Number
    }
  },
  computed:{
    newTime(){
      return convertDate(this.dateTime)
    }
  }
}
</script>

<style scoped>

</style>
