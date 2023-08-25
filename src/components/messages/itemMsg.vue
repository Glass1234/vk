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
        <div class="d-flex align-center">
          <v-list-item-title class="d-flex align-center w-100"
                             :class="!isReadMsg.flag && isReadMsg.out ? 'bg-grey-darken-1 rounded pa-1':''">
            <div>
              <v-img v-if="isISendMsg" :src="MeImg" width="25" height="25" class="rounded-circle"/>
            </div>
            <div class="ml-2">
              <span class="text-yellow">{{ LastMsg.type }}</span>
              <span>{{ LastMsg.msg }}</span>
            </div>
          </v-list-item-title>
          <div class="ml-2">
            <template v-if="isToday()">
              <div>
                {{ timeMsg.hours }}:{{ timeMsg.minutes }}
              </div>
            </template>
            <template v-else-if="isYesterday()">
              <div>Вчера</div>
            </template>
            <template v-else-if="isThisYear()">
              <div>{{ timeMsg.days }}.{{ timeMsg.month }}</div>
            </template>
            <template v-else>
              <div>{{ timeMsg.years}}</div>
            </template>
          </div>
        </div>
      </div>
    </v-list-item>
  </div>
</template>

<script>
import store from "@/store";
import {convertDate} from "@/utils";

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
  created() {
    this.timeMsg = this.getDate()
  },
  data() {
    return {
      timeMsg: {}
    }
  },
  methods: {
    getDate() {
      return convertDate(this.msg.last_message.date)
    },
    isToday() {
      const dateObj = new Date(this.msg.last_message.date * 1000);
      const nowObj = new Date();
      return (
          dateObj.getFullYear() === nowObj.getFullYear() &&
          dateObj.getMonth() === nowObj.getMonth() &&
          dateObj.getDate() === nowObj.getDate()
      );
    },
    isYesterday() {
      const dateObj = new Date(this.msg.last_message.date * 1000);
      const nowObj = new Date();
      const yesterdayObj = new Date(nowObj.getFullYear(), nowObj.getMonth(), nowObj.getDate() - 1);
      return (
          dateObj.getFullYear() === yesterdayObj.getFullYear() &&
          dateObj.getMonth() === yesterdayObj.getMonth() &&
          dateObj.getDate() === yesterdayObj.getDate()
      );
    },
    isThisYear() {
      const dateObj = new Date(this.msg.last_message.date * 1000);
      const nowObj = new Date();
      return (
          dateObj.getFullYear() === nowObj.getFullYear()
      );
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
      return {
        out: this.msg.last_message.out,
        flag: this.msg.conversation.in_read === this.msg.conversation.out_read
      }
    },
    isISendMsg() {
      return this.msg.last_message.from_id === store.state.user.id;
    },
    MeImg() {
      return store.state.user.photo_200
    }
  },
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
