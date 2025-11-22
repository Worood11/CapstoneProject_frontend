export default async function sendRequest(url, method = 'GET', payload) {
  const options = { method };

  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  } else {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000${url}`, options);

    if (res.ok) {
      try {
        return await res.json(); // ✅ must be inside function
      } catch {
        return null;
      }
    } else {
      console.error(`Request failed with status ${res.status}`);
      try {
        const errData = await res.json();
        console.error("Error data:", errData);
      } catch {}
      return null;
    }
  } catch (err) {
    console.error("Network or server error:", err);
    return null;
  }
}
