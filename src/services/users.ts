import api from './api';

interface FormProps {
  name: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  neighborhood: string | undefined;
  city: string | undefined;
  number: number | undefined;
  cep: string | undefined;
}

export const getUsers = async () => {
  try {
    const { data } = await api.get(`/users`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (id: number) => {
  try {
    const { data } = await api.get(`/user/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUser = async (formData: FormProps) => {
  try {
    const { data } = await api.post(`/user`, formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (id: number | undefined, formData: FormProps) => {
  try {
    const { data } = await api.put(`/user/${id}`, formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const { data } = await api.delete(`/user/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};