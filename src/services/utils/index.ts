export const getAccessToken = () => localStorage.getItem("accessToken");

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem("accessToken", accessToken);

export const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
});

export const getHeadersWIthToken = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});
