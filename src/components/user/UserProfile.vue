<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-card class="pa-3" color="grey-darken-3">
          <div class="d-flex" v-if="this.user">
            <img class="rounded-circle border-lg" :src="user.photo_200" width="150" alt="">
            <div class="ml-3">
              <div class="text-h6">{{ user.first_name }} {{ user.last_name }}</div>
              <div class="text-subtitle-2">{{ user.status }}</div>
              <div class="align-center d-inline-flex">
                <v-img src="@/assets/icons/location.svg" aspect-ratio="1/1" width="25px" height="25px"
                       v-if="user['city']"/>
                <div class="text-overline ml-1" v-if="user['city']">{{ user.city.title }}</div>
                <v-dialog transition="dialog-bottom-transition" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text">
                      <v-img src="@/assets/icons/info.svg" aspect-ratio="1/1" width="25px" height="25px"/>
                      <span class="text-overline ml-1">Подробнее</span>
                    </v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card color="dark">
                      <v-toolbar color="purple-accent-3">
                        <span class="px-3 text-h5">Подробная информация</span>
                      </v-toolbar>
                      <v-card-text class="bg-grey-darken-3">
                        <template v-if="!isPrived">
                          <div class="d-flex flex-column">
                            <div class="d-flex d-inline-flex align-center" v-if="user.status">
                              <v-img src="@/assets/icons/process_chart.svg" max-width="25px" height="25px"/>
                              <div class="text-caption ml-1">{{ user.status }}</div>
                            </div>
                            <div class="align-center d-inline-flex align-center">
                              <v-img src="@/assets/icons/alternate_email.svg" max-width="25px" height="25px"/>
                              <div class="text-caption ml-1">{{ user.id }}</div>
                            </div>
                            <v-divider class="my-2"/>
                            <div class="align-center d-inline-flex align-center" v-if="user.bdate">
                              <v-img src="@/assets/icons/celebration.svg" max-width="25px" height="25px"/>
                              <div class="text-caption ml-1">День рождения: {{ user.bdate }} г.</div>
                            </div>
                            <div class="align-center d-inline-flex align-center" v-if="user['city']">
                              <v-img src="@/assets/icons/house.svg" max-width="25px" height="25px"/>
                              <div class="text-caption ml-1">Город: {{ user.city.title }}</div>
                            </div>
                            <v-divider class="my-2"/>
                            <v-row class="mt-2 ml-1">
                              <div>
                                <div v-if="people.count">{{ people.count }}</div>
                                <div class="text-caption">друг</div>
                              </div>
                              <div class="ml-2">
                                <div>{{ groups.users.count + groups.groups.count }}</div>
                                <div class="text-caption">подписок</div>
                              </div>
                              <div class="ml-2">
                                <div>{{ communities.count }}</div>
                                <div class="text-caption">сообщества</div>
                              </div>
                            </v-row>
                            <v-divider class="mt-4"/>
                          </div>
                        </template>
                        <template v-else>
                          <span class="text-h5">Это закрытый профиль</span>
                        </template>
                      </v-card-text>
                      <v-card-actions class="justify-end bg-grey-darken-3">
                        <v-btn variant="text" @click="isActive.value = false">
                          <v-img src="@/assets/icons/close.svg" aspect-ratio="1/1" width="25px" height="25px"/>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <div>
                  <v-btn variant="text" :to="`albums?id=${user.id}`">
                    <v-img src="@/assets/icons/photo_library.svg" aspect-ratio="1/1" width="25px" height="25px"/>
                    <span class="text-overline ml-1">Альбомы</span>
                  </v-btn>
                </div>
                <v-spacer/>
                <div v-if="friendStatus===3">
                  <v-btn variant="text" @click="deleteFriend()">
                    <v-img src="@/assets/icons/sentiment_dissatisfied.svg" aspect-ratio="1/1" width="25px"
                           height="25px"/>
                    <span class="text-overline ml-1">Удалить из друзей</span>
                  </v-btn>
                </div>
                <div v-else-if="friendStatus===2">
                  <v-btn variant="text" @click="acceptFriend()">
                    <v-img src="@/assets/icons/add_reaction.svg" aspect-ratio="1/1" width="25px"
                           height="25px"/>
                    <span class="text-overline ml-1">Принять заявку</span>
                  </v-btn>
                </div>
                <div v-else-if="friendStatus===0 && user.id!== store.state.user.id">
                  <v-btn variant="text" @click="acceptFriend()">
                    <v-img src="@/assets/icons/add.svg" aspect-ratio="1/1" width="25px"
                           height="25px"/>
                    <span class="text-overline ml-1">Добавить в друзья</span>
                  </v-btn>
                </div>
                <div v-else-if="friendStatus===1">
                  <v-btn variant="text" @click="deleteFriend">
                    <v-img src="@/assets/icons/remove.svg" aspect-ratio="1/1" width="25px"
                           height="25px"/>
                    <span class="text-overline ml-1">Отписаться</span>
                  </v-btn>
                </div>
              </div>
              <div>Пользователь был в сети
                <span v-show="!userOnlineTime">очень давно</span>
              </div>
              <v-card color="grey-darken-4" v-show="userOnlineTime" style="width: fit-content;">
                <v-row class="pa-1">
                  <v-card-item>
                    {{ userOnlineTime?.hours }} : {{ userOnlineTime?.minutes }}
                  </v-card-item>
                  <v-card-item>
                    {{ userOnlineTime?.days }}.{{ userOnlineTime?.month }}.{{ userOnlineTime?.years }}
                  </v-card-item>
                </v-row>
              </v-card>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-card class="pa-3" color="grey-darken-3" min-height="200px">
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-3" color="grey-darken-3">
          <v-card color="grey-darken-2 pa-2">
            <template v-if="usersInfOnline">
              <v-btn class="d-flex" variant="text" @click="this.$router.push(`/friends?id=${user.id}&section=online`)">
                <span class="text-caption">Друзья онлайн</span>
                <span class="text-caption text-grey-lighten-1 ml-1" v-if="friendsOnline">{{
                    friendsOnline.length
                  }}</span>
              </v-btn>
              <div class="d-flex d-inline-flex">
                <v-col v-for="(item,i) in usersInfOnline" :key="i" :value="item">
                  <v-btn variant="text" stacked size="x-large" @click="this.$router.push(`id${item.id}`)">
                    <img class="rounded-circle" :src="item.photo_200" width="63" height="63" alt="">
                    <span class="mt-1 text-caption">{{ item.first_name }}</span>
                  </v-btn>
                </v-col>
              </div>
              <div v-if="isPrived">Это закрытый профиль</div>
              <v-divider class="my-2"/>
            </template>
            <template v-if="!isPrived">
              <v-btn class="d-flex" variant="text" @click="this.$router.push(`/friends?id=${user.id}&section=all`)">
                <span class="text-caption">Друзья</span>
                <span class="text-caption text-grey-lighten-1 ml-1" v-if="people">{{ people.count }}</span>
              </v-btn>
              <div class="d-flex d-inline-flex" v-if="usersInfOfline">
                <v-col v-for="(item,i) in usersInfOfline" :key="i" :value="item">
                  <v-btn variant="text" stacked size="x-large" @click="this.$router.push(`id${item.id}`)">
                    <img class="rounded-circle" :src="item.photo_200" width="63" height="63" alt="">
                    <span class="mt-1 text-caption">{{ item.first_name }}</span>
                  </v-btn>
                </v-col>
              </div>
            </template>
            <template v-else>
              <span class="text-caption">Друзья</span>
              <div>Это закрытый профиль</div>
            </template>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import {api} from "@/api/index.js"
import {convertDate} from "@/utils";

export default {
  name: 'UserProfile',
  created() {
    this.init()
  },
  watch: {
    '$route.params.id'() {
      this.init()
    }
  },
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      user: null,
      people: null,
      groups: null,
      communities: null,
      friendsOnline: null,
      usersInfOnline: null,
      usersInfOfline: null,
      isPrived: true,
      userOnlineTime: {},
      friendStatus: 0
    }
  },
  methods: {
    cropArr(arr) {
      if (this.isPrived || typeof arr === 'undefined') {
        return
      }
      if (arr.length >= 5) {
        return arr.slice(0, 4)
      } else {
        return arr
      }
    },
    convertDate(unixTime) {
      this.userOnlineTime = convertDate(unixTime)
    },
    async getOnlineStatus() {
      const date = (await api.getLastOnlineUser(this.user.id)).data.response[0].last_seen?.time
      if (!date) {
        this.userOnlineTime = date
        return
      }
      this.convertDate(date)
    },
    async checkUser() {
      if (this.$route.params.id == store.state.user.id) {
        this.user = store.state.user
      } else {
        this.user = (await api.getFriendInfo(this.$route.params.id)).data.response[0]
      }
    },
    async getPeople() {
      this.people = (await api.getUserPeople(this.user.id)).data
      if (this.people.error?.error_code === 30) {
        this.isPrived = true
      } else {
        this.isPrived = false
        this.people = this.people.response
      }
    },
    async getGroups() {
      this.groups = (await api.getUserCountGroups(this.user.id)).data.response
    },
    async getCommunities() {
      this.communities = (await api.getUserCountCommunitiles(this.user.id)).data.response
    },
    async getFriendsOnli() {
      if (this.isPrived) {
        return
      }
      this.friendsOnline = (await api.getFriendsOnline(this.user.id)).data.response
      this.friendsOnline = this.friendsOnline.online.concat(this.friendsOnline.online_mobile)
    },
    async getUsersInfOnline() {
      this.usersInfOnline = (await api.getUsersMin(this.friendsOnline)).data.response
      this.usersInfOnline = this.cropArr(this.usersInfOnline)
      this.usersInfOfline = (await api.getUsersMin(this.cropArr(this.people.items))).data.response
      this.usersInfOfline = this.cropArr(this.usersInfOfline)
    },
    async deleteFriend() {
      const res = (await api.deleteFriend(this.user.id)).data.response
      if (res.success) {
        this.friendStatus = 2
      }
    },
    async acceptFriend() {
      const res = (await api.addFriend(this.user.id)).data.response
      if (res === 2) {
        this.friendStatus = 3
      } else if (res === 1) {
        this.friendStatus = 1
      }
    },
    async isFriend() {
      const res = (await api.isFriend(this.user.id)).data.response[0]
      this.friendStatus = res.friend_status
    },
    async init() {
      this.user = null
      this.people = null
      this.groups = null
      this.communities = null
      this.friendsOnline = null
      this.usersInfOnline = null
      this.usersInfOfline = null
      this.isPrived = true
      this.userOnlineTime = {}
      await this.checkUser()
      await Promise.all([
        this.getPeople(),
        this.getGroups(),
        this.getCommunities(),
        this.getOnlineStatus(),
        this.isFriend()
      ])
      await this.getFriendsOnli()
      await this.getUsersInfOnline()
    }
  }
}
</script>

<style scoped>

</style>
