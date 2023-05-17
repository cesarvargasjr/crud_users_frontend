import api from './api';

export interface FormProps {
  name?: string;
  phone?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  number?: number;
  cep?: string;
  complement?: string;
}

interface RegisterUserProps {
  formData: FormProps;
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

export const registerUser = async ({ formData }: RegisterUserProps) => {
  try {
    const { data } = await api.post(`/user`, { ...formData });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (id: number | undefined, { formData }: RegisterUserProps) => {
  try {
    const { data } = await api.put(`/user/${id}`, { ...formData });
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