import token from "@/data/token";
import axios from "axios";
import store from "@/store";

export class Api {
    #token = token.token
    #baseUrl = 'https://api.vk.com/method/'
    #baseDataUrl = {
        access_token: this.#token,
        v: 5.131
    }

    #createURL(method, data) {
        let url = new URL(this.#baseUrl + method)
        for (let key in this.#baseDataUrl) {
            url.searchParams.set(key, this.#baseDataUrl[key])
        }
        for (let key in data) {
            url.searchParams.set(key, data[key])
        }
        return url
    }

    async #getRequest(apiMethod, data = null) {
        const url = this.#createURL(apiMethod, data)
        return (await axios({
            method: 'get',
            url: url
        }))
    }

    // возвращает основную информацию о профиле
    async getUserInfo() {
        return await this.#getRequest('account.getProfileInfo')
    }

    // возвращает список друзей
    async getUserPeople(id) {
        const data = {
            order: 'hints',
            user_id: id
        }
        return await this.#getRequest('friends.get', data)
    }

    // возвращает список сообществ
    async getUserCountCommunitiles(id) {
        const data = {
            user_id: id
        }
        return await this.#getRequest('groups.get', data)
    }

    // возвращает список публичных страниц + список групп
    async getUserCountGroups(id) {
        const data = {
            user_id: id
        }
        return await this.#getRequest('users.getSubscriptions', data)
    }

    // возвращает список пользователей онлайн
    async getFriendsOnline(id) {
        const data = {
            online_mobile: 1,
            user_id: id
        }
        return await this.#getRequest('friends.getOnline', data)
    }

    // вовзращает маленькую аву пользователей + ФИО
    async getUsersMin(ids) {
        const data = {
            fields: 'photo_200',
            user_ids: ids
        }
        return await this.#getRequest('users.get', data)
    }

    // вовзращает расширенную инфу о пользователе
    async getFriendInfo(id) {
        const data = {
            fields: 'status,photo_200,bdate,city,blacklisted',
            user_ids: id
        }
        return await this.#getRequest('users.get', data)
    }

    // возвращает когда последний раз пользователь был в сети
    async getLastOnlineUser(id = null) {
        const data={
            fields:'last_seen',
            user_ids:id === null ? store.state.user.id : id
        }
        return await this.#getRequest('users.get', data)
    }
}

export let api = new Api()