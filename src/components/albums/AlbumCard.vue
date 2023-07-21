<template>
  <v-sheet :height="200" style="overflow: hidden" class="container rounded bg-black" @click="goPage()">
    <div>
      <div class="name text-white">
        <span>{{ name }}</span>
        <span>{{ count }}</span>
      </div>
      <v-img height="200" :src="url" cover/>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'AlbumCard',
  props: {
    url: {
      required: false,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    count: {
      required: false,
      type: Number
    },
    albumId: {
      required: true,
    },
    ownerId: {
      required: true,
      type: Number
    }
  },
  methods: {
    goPage() {
      this.$router.push(`/album${this.ownerId}/${this.albumId}`)
    }
  }
}
</script>

<style scoped>
.name {
  position: absolute;
  left: 10px;
  bottom: 5px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.container {
  position: relative;
  cursor: pointer;
}

.container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  transition: opacity 0.2s;
  opacity: 0;
}

.container:hover::after {
  opacity: 1;
}
</style>