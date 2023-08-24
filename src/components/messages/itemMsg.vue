<template>
  <v-list-item class="rounded hovering pointer">
    <template v-slot:prepend>
      <v-btn
          icon
          size="64"
          class="rounded-circle"
      >
        <v-avatar color="grey-darken-1" :image="getPhoto" size="64" class="rounded-circle"/>
      </v-btn>
    </template>
    <div class="ml-2">
      <v-list-item-title>{{ getName }}</v-list-item-title>
      <v-list-item-subtitle class="d-flex align-center" :class="!isReadMsg ? 'bg-green-accent-2 rounded pa-1':''">
        <div>
          <v-img v-if="isISendMsg" :src="getMeImg" width="25" height="25" class="rounded-circle"/>
        </div>
        <div class="ml-2">
          {{ getLastMsg }}
        </div>
      </v-list-item-subtitle>
    </div>
  </v-list-item>
</template>

<script>
import store from "@/store";

export default {
  name: "itemMsg",
  props: {
    msg: {
      required: true,
      type: Object
    },
    companion: {
      required: true,
      type: Object
    }
  },
  computed: {
    getPhoto() {
      if (this.companion?.photo_200 === undefined && this.companion?.photo_100 === undefined) {
        console.log(this.companion, this.msg)
      }
      if (this.companion?.photo_200) {
        return this.companion.photo_200
      } else if (this.companion?.photo_100) {
        return this.companion.photo_100
      }else{
        return ''
      }
    },
    getName() {
      if (this.companion?.name) {
        return this.companion.name
      } else {
        return `${this.companion.first_name} ${this.companion.last_name}`
      }
    },
    getLastMsg() {
      return this.msg.last_message.text
    },
    isReadMsg() {
      return this.msg.conversation.last_message_id <= this.msg.conversation.out_read;
    },
    isISendMsg() {
      return this.msg.last_message.from_id === store.state.user.id;
    },
    getMeImg() {
      return store.state.user.photo_200
    }
  }
}
</script>

<style scoped>
.hovering:hover {
  background-color: #212121;
}

.pointer {
  cursor: pointer;
}
</style>
