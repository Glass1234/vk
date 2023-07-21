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
        console.log(apiMethod);
        const url = this.#createURL(apiMethod, data)
        let req = await axios.get(url.toString())
        while (req.data.error?.error_code === 6) {
            req = await axios.get(url.toString())
        }
        return req
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
        const data = {
            fields: 'last_seen',
            user_ids: id === null ? store.state.user.id : id
        }
        return await this.#getRequest('users.get', data)
    }

    // возвращает id не основых альбомов
    async getAlbums(id = store.state.user.id) {
        const data = {
            owner_id: id,
            rev: true
        }
        return await this.#getRequest('photos.getAlbums', data)
    }

    // возвращает альбом со стены
    async getWallAlbum(id = store.state.user.id, count = 1) {
        const data = {
            owner_id: id,
            count: count,
            album_id: 'wall',
            rev: true
        }
        return await this.#getRequest('photos.get', data)
    }

    // возвращает альбом профиля
    async getProfileAlbum(id = store.state.user.id, count = 1) {
        const data = {
            owner_id: id,
            count: count,
            album_id: 'profile',
            rev: true
        }
        return await this.#getRequest('photos.get', data)
    }

    // возвращает альбом с сохрами
    async getSavedAlbum(id = store.state.user.id, count = 1) {
        const data = {
            owner_id: id,
            count: count,
            album_id: 'saved',
            rev: true
        }
        return await this.#getRequest('photos.get', data)
    }

    // возвращает последнюю картинку из альбома
    async getLastPictureAlbums(id = store.state.user.id, album_id, count = 1) {
        const data = {
            owner_id: id,
            count: count,
            album_id: album_id,
            rev: true
        }
        return await this.#getRequest('photos.get', data)
    }

    async getPhotoFromAlbum(album_id, owner_id, start = 0, count = 10) {
        const data = {
            owner_id: owner_id,
            album_id: album_id,
            rev: true,
            offset: start,
            count: count
        }
        return await this.#getRequest('photos.get', data)
    }
}

export let api = new Api()