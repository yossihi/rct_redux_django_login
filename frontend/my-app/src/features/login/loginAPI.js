import axios from "axios";

export async function logingIn(formData) {
  const data = await axios.post("http://127.0.0.1:8000/login/", formData)
  return data;
}

export async function secureFunc() {
  const myToken = sessionStorage.getItem('access')
  return await axios.get("http://127.0.0.1:8000/secure/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
  })
}

export async function unsecureFunc() {
  return await axios.get("http://127.0.0.1:8000/unsecure/")
}

export async function register(formData) {
  return await axios.post("http://127.0.0.1:8000/register/", formData)
}
