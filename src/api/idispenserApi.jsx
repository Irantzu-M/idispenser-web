import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/o/idispenser-rest/v1.0/";

const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Fallo en la conexión");
    }
    return await response.json();
  } catch (error) {
    console.error("Fallo al recuperar los datos:", error);
    throw error;
  }
};

export const getApiData = async (endpoint) => {
  return fetchApi(endpoint);
};

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
