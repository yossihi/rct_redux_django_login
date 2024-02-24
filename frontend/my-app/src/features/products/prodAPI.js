import axios from "axios";

export async function loadData() {
  const myToken = sessionStorage.getItem('access')
  return await axios.get("http://127.0.0.1:8000/products/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
  });
}

export async function deleteProd(prodID) {
  const myToken = sessionStorage.getItem('access')
  return await axios.delete(`http://127.0.0.1:8000/products/${prodID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
  });
}

export async function addProd(formData) {
  const myToken = sessionStorage.getItem('access')
  return await axios.post("http://127.0.0.1:8000/products/", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
  });
}

export async function updProd(prodID, formData) {
  const myToken = sessionStorage.getItem('access')
  return await axios.put(`http://127.0.0.1:8000/products/${prodID}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
  });
}

export async function buyProd(prodID) {
  const myToken = sessionStorage.getItem('access')
  return await axios.post(`http://127.0.0.1:8000/buyProd/${prodID}`,{}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + myToken,
    },
  });
}