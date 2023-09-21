import React from "react";
import axios from "axios";
const API_ENDPOINT = "https://api.dev.pastorsline.com/api/contacts.json";

const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4";
const headers = {
  Authorization: `Bearer ${authToken}`,
};
const getAllCountry = async (params = "") => {
  let buildUrl = API_ENDPOINT + params;
  let response = await axios.get(buildUrl, { headers });
  return response;
};

export { getAllCountry };
