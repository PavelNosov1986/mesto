import { fetchApi } from "./fetch";

const url_get_me = "users/me ";
const url_patch_me = "users/me ";
const url_patch_avatar = "users/me/avatar ";

const fetchGetMe = () => fetchApi(url_get_me, "GET");

const fetchUpdateMe = (data) => fetchApi(url_patch_me, "PATCH", data);

const fetchUpdateAvatar = (data) => fetchApi(url_patch_avatar, "PATCH", data);

export const usersApi = {
    fetchGetMe,
    fetchUpdateMe,
    fetchUpdateAvatar 
}