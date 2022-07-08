import { fetchApi } from "./fetch";

const url_get_cards = "cards";
const url_post_cards = "cards";
const url_delete_cards = "cards";
const url_likes_cards = "cards";

const fetchGetCards = () => fetchApi(url_get_cards, "GET");
const fetchPostCards = (data) => fetchApi(url_post_cards, "POST", data);
const fetchDeleteCards = (cardId) => fetchApi(`${url_delete_cards}/${cardId}`, "DELETE");

const fetchAddLikeCards = (cardId) => fetchApi(`${url_likes_cards}/${cardId}/likes`, "PUT");
const fetchDeleteLikeCards = (cardId) => fetchApi(`${url_delete_cards}/${cardId}/likes`, "DELETE");

export const cardsApi = {
    fetchGetCards,
    fetchPostCards,
    fetchDeleteCards,
    fetchAddLikeCards,
    fetchDeleteLikeCards
}