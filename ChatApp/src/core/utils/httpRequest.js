import axios from "axios";
import { notifications } from "@mantine/notifications";
import API_CONFIG from "./apiConfig.js";

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const contentType = {
  appJson:"application/json",
  formData:"multipart/form-data"
}

export async function httpRequest(
  endpoint,
  method = HTTP_METHODS.GET,
  contentType,
  data = {},
  headers = {},
  queryParameters = {},
  fullUrl = null,
) {
  try {
    let url = prepareUrl();
    const response = await axios({
      url: url,
      method: method.toUpperCase(),
      data,
      headers: {
        ...headers,
        "Content-Type": contentType,
      }
    });
    printResponse(response);
    return response;
  } catch (error) {
    printError(error);
    if (error.response.data.message) {
      notifications.show({
        message: `${error.response.data.message}`,
        color: "red",
      });
      if(error.response.data.errors.length){
        const valiationErrors = error.response.data.errors
        valiationErrors[0].forEach(error => {
          notifications.show({
            message: error.message,
            color: "red",
          });
        });
      }
      if(error.response.data.data.activateEmail === false){
        setTimeout(() => {
            location.href = `/activateemail?email=${data.email}`;
        }, 2000)
      }
    } else {
      notifications.show({
        message: "Something went wrong",
        color: "red",
      });
    }
    throw error;
  }

  function prepareUrl() {
    let url = fullUrl ? fullUrl : API_CONFIG.baseUrl + endpoint;
    if (Object.keys(queryParameters).length > 0) {
      const queryString = new URLSearchParams(queryParameters).toString();
      url += `?${queryString}`;
    }
    return url;
  }

  function printResponse(response) {
    console.log("API URL => ", API_CONFIG.baseUrl + endpoint);
    console.log("API response => ", response);
    console.log("API response.data => ", response.data);
  }

  function printError(error) {
    console.error("Error fetching data => ", error);
    console.error("Error message => ", error.message);
    console.error("err.response.data.message => ", error.response.data.message);
  }
}