import axios from "axios";

export async function getCart() {
    const myToken = sessionStorage.getItem('access')
    return await axios.get(`http://127.0.0.1:8000/getCart/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    });
  }

export async function unBuy(prodID) {
  const myToken = sessionStorage.getItem('access')
    return await axios.delete(`http://127.0.0.1:8000/unbuy/${prodID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    });
}