<template>
  <div :class="!isReadMsg.flag && !isReadMsg.out ? 'bg-grey-darken-2 rounded':''">
    <v-list-item class="rounded hovering pointer">
      <template v-slot:prepend>
        <v-btn
            icon
            size="64"
            class="rounded-circle"
        >
          <v-avatar color="grey-darken-1" :image="Photo" size="64" class="rounded-circle"/>
        </v-btn>
      </template>
      <div class="ml-2">
        <v-list-item-title>{{ Name }}</v-list-item-title>
        <v-list-item-title class="d-flex align-center" :class="!isReadMsg.flag && isReadMsg.out ? 'bg-grey-darken-1 rounded pa-1':''">
          <div>
            <v-img v-if="isISendMsg" :src="MeImg" width="25" height="25" class="rounded-circle"/>
          </div>
          <div class="ml-2">
            <span class="text-yellow">{{ LastMsg.type }}</span>
            <span>{{ LastMsg.msg }}</span>
          </div>
        </v-list-item-title>
      </div>
    </v-list-item>
  </div>
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
    Photo() {
      if (this.companion?.photo_200) {
        return this.companion.photo_200
      } else if (this.companion?.photo_100) {
        return this.companion.photo_100
      } else {
        return ''
      }
    },
    Name() {
      if (this.companion?.name) {
        return this.companion.name
      } else {
        return `${this.companion.first_name} ${this.companion.last_name}`
      }
    },
    LastMsg() {
      const data = {
        type: '',
        msg: this.msg.last_message.text
      }
      const type = this.msg.last_message.attachments[0]?.type
      if (type !== undefined) {
        data.type = type + ' '
      }
      return data
    },
    isReadMsg() {
      const data = {
        out: this.msg.last_message.out,
        flag: this.msg.conversation.in_read === this.msg.conversation.out_read
      };
      console.log(data);
      return data
    },
    isISendMsg() {
      return this.msg.last_message.from_id === store.state.user.id;
    },
    MeImg() {
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
