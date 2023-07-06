import axios from "axios";
import token from "@/data/token";

export default {
    token: token[0].token,
    getUserInfo: async function () {
        const apiMethod = 'account.getProfileInfo';
        const apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
    getUserPeople: async function (id) {
        const apiMethod = 'friends.get';
        let apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&order=hints&user_id=${id}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
    getUserCountGroups: async function (id) {
        const apiMethod = 'users.getSubscriptions';
        const apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&user_id=${id}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
    getUserCountCommunitiles: async function (id) {
        const apiMethod = 'groups.get';
        const apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&user_id=${id}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
    getFriendsOnline: async function (id) {
        const apiMethod = 'friends.getOnline';
        const apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&online_mobile=1&user_id=${id}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
    getUsersMin: async function (ids) {
        const apiMethod = 'users.get';
        const apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&fields=photo_200&user_ids=${ids}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
    getFriendInfo: async function (id) {
        const apiMethod = 'users.get';
        const apiUrl = `https://api.vk.com/method/${apiMethod}?access_token=${this.token}&fields=status,photo_200,bdate,city,blacklisted&user_ids=${id}&v=5.131`
        const res = await axios({
            method: "get",
            url: apiUrl
        })
        return res
    },
}