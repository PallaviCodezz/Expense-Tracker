export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token") || null;

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
