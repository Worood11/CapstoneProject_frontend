import sendRequest from "./sendRequest";

export async function getByBookstore(bookstoreId) {
  return sendRequest(`/bookstores/${bookstoreId}/events/`);
}
export async function index() {
  return sendRequest("/events/");
}
export async function createEvent(bookstoreId, formData) {
  return sendRequest(`/bookstores/${bookstoreId}/events/`, "POST", formData);
}
export async function getEvent(eventId) {
  return sendRequest(`/events/${eventId}/`);
}
export async function deleteEvent(eventId) {
  return sendRequest(`/events/${eventId}/`, "DELETE");
}
export async function updateEvent(eventId, formData) {
  return sendRequest(`/events/${eventId}/`, "PUT", formData);
}
