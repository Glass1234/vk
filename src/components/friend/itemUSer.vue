<template>
  <v-list-item>
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
        <v-btn variant="plain"
               size="x-small"
               class="text-caption pl-0" color="blue-accent-1">
          Написать сообщение
        </v-btn>
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
    }
  }
}
</script>

<style scoped>
</style>