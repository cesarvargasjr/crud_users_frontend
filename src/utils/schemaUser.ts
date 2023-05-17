import * as yup from 'yup';

const maskPhone = /\(\d{2}\)\s\d{5}-\d{4}/;
const maskCep = /\d{5}-\d{3}/;

export const createUserSchema = yup.object({
    name: yup.string().required('Preencha o nome completo'),
    phone: yup.string().required('Preencha o telefone').matches(maskPhone, 'O telefone deve ter 11 dígitos'),
    address: yup.string().required('Preencha o endereço'),
    cep: yup.string().required('Preencha o CEP').matches(maskCep, 'O CEP deve ter 8 dígitos'),
    number: yup.number().required('Preencha o número'),
    neighborhood: yup.string().required('Preencha o bairro'),
    city: yup.string().required('Preencha a cidade'),
    state: yup.string().required('Preencha o estado'),
    complement: yup.string().nullable().notRequired(),
});
