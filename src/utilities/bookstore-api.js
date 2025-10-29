import sendRequest from "./sendRequest";
const url = "/bookstores/"

export async function index() {
    return sendRequest(url)
}
export function show(bookstoreId) {
    return sendRequest(`${url}${bookstoreId}/`);
}
export async function create(formData) {
    return sendRequest(url, "POST", formData)
}
export async function update( bookstoreId ,formData) {
    return sendRequest(`${url}${bookstoreId}/`, "PUT", formData)
}

export async function deleteBookstore(bookstoreId) {
    return sendRequest(`${url}${bookstoreId}/`, "DELETE")
}