<template>
  <v-list-item class="hovering rounded">
    <template v-slot:prepend>
      <v-btn
          icon
          size="64"
          @click="this.$router.push(`id${user.id}`)"
      >
        <v-avatar color="grey-darken-1" :image="user.photo_200" size="64"></v-avatar>
      </v-btn>
    </template>
    <div class="ml-2">
      <v-list-item-title>{{ user.first_name + ' ' + user.last_name }}</v-list-item-title>
      <v-list-item-subtitle>
        <div class="d-flex">
          <v-btn variant="tonal"
                 size="x-small"
                 class="text-caption" color="blue-accent-1">
            Написать сообщение
          </v-btn>
          <v-spacer/>
          <v-btn variant="tonal" @click="add()" v-if="isAdd"
                 size="x-small"
                 class="text-caption mr-2" color="green">
            <div class="d-flex">
              <v-img :src="require('@/assets/icons/add.svg')" width="20"/>
              <span>{{ isAdd }}</span>
            </div>
          </v-btn>
          <v-btn variant="tonal" @click="del()" v-if="isDeleted"
                 size="x-small"
                 class="text-caption" color="red">
            <div class="d-flex">
              <v-img :src="require('@/assets/icons/delete.svg')" width="20"/>
              <span>{{ isDeleted }}</span>
            </div>
          </v-btn>
        </div>

      </v-list-item-subtitle>
    </div>
  </v-list-item>
</template>

<script>
export default {
  name: 'itemUser',
  props: {
    user: {
      required: true,
    },
    isDeleted: {
      required: false,
      default: '',
      type: String
    },
    isAdd: {
      required: false,
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    del() {
      this.$emit('del', this.user.id)
    },
    add() {
      this.$emit('add', this.user.id)
    }
  }
}
</script>

<style scoped>
.hovering:hover {
  background-color: #212121;
}
</style>
