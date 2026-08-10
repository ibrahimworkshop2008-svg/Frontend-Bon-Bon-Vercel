import api from "./axiosInstance";

export const getAllProducts = async () => {
  const response = await api.get("/product/all");
  return response.data;
};

export const createProduct = async (fields, files = []) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post("/product/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const updateProduct = async (id, fields, files = []) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.put(`/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/delete/${id}`);
  return response.data;
};
