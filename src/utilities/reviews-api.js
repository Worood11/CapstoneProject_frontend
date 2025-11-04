import sendRequest from "./sendRequest";

export function getByBookstore(bookstoreId) {
    return sendRequest(`/bookstores/${bookstoreId}/reviews/`);
}

export function create(formData, bookstoreId) {
    return sendRequest(`/bookstores/${bookstoreId}/reviews/`, "POST", formData);
}

export function remove(reviewId) {
  return sendRequest(`/reviews/${reviewId}/`, "DELETE");
}
