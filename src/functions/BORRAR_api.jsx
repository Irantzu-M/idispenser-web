// import React from "react";
// import { useState } from "react";
// const API_BASEURL = "http://127.0.0.1:5500/src/mocks/";
// const api = (endpoint, method = "GET", body) => {
//   return fetch(API_BASEURL + endpoint, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: body ? JSON.stringify(body) : null,
//   }).then((r) => r.json());
// };

// /// probar
// /*export default {
//   getProducts: async (item, type, params) => {
//     const data = await fetch(API_BASEURL + "/?" + type + "" + params).then(
//       (r) => r.json()
//     );
//     return data;
//   },
//   getStores: async (item, params) => {
//     const data = await fetch(API_BASEURL + "/?" + params).then((r) => r.json());
//     return data;
//   },
// };*/

// const apiGetItems = async (params) => {
//   const data = await fetch(API_BASEURL + params, {
//     method: "GET",
//   }).then((r) => r.json());
//   return data;
// };

// // const [items, setItems] = useState([]);

// // const fetchItems = async (params) => {
// //   const data = await fetch(API_BASEURL + params, {
// //     method: "GET",
// //   }).then((r) => r.json());
// //   return data;
// // };

// // const fetchSingleItem = async (itemType, itemId) => {
// //   const data = await fetch(API_BASEURL + itemType + itemId, {
// //     method: "GET",
// //   }).then((r) => r.json());
// //   return data[0];
// // };

// // // TODO - Hacer
// // const editItem = async (itemId, body) => {
// //   await fetch(API_BASEURL + itemType + itemId, {
// //     method: "POST",
// //     body: JSON.stringify({
// //       body: body,
// //     }),
// //     // TODO - los headers que necesitemos
// //     headers: { "Content-type": "application/json; chartset=UTF-8" },
// //   })
// //     .then((r) => r.json())
// //     .then((data) => setPosts((prevPosts) => [data, ...prevPosts]));
// // };
// // // TODO - Hacer
// // const deleteItem = async (itemId) => {
// //   await fetch(API_BASEURL + itemType + itemId, {
// //     method: "DELETE",
// //   }).then((response) => {
// //     if (response.status === 200) {
// //       setItems(
// //         items.filter((item) => {
// //           return itemId.id !== itemId;
// //         })
// //       );
// //     }
// //   });
// // };

// export { apiGetItems };
