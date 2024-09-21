import { getAccessToken } from "../../utils";

export const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
});
