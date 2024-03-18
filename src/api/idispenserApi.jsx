import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/o/idispenser-rest/v1.0/";

export const fetchApi = async (
  endpoint,
  options = {
    method: "GET",
  }
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await Liferay.Util.fetch(url, options);
    console.log("::: ", url);

    if (!response.ok) {
      throw new Error("Fallo en la conexión");
    }
    console.log("response::: ", response);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// export const getApiData = async (endpoint) => {
//   return fetchApi(endpoint);
// };

export const postApiData = async (data, endpoint) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetchApi(endpoint, options);
};

export const deleteApiData = async (data, endpoint) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetchApi(endpoint, options);
};
