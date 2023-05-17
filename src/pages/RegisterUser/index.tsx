import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Spin } from "antd";
import { useState } from "react";
import { FormProps, registerUser } from "../../services/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../../utils/schemaUser";
import { Form, Formik } from "formik";
import { timeOut } from "../../utils/timeOut";
import cep from "cep-promise";
import * as S from "./styles";

export const RegisterUser = () => {
  const navigate = useNavigate();
  const [disableAddressFields, setDisableAddressFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data] = useState<FormProps>({
    name: undefined,
    phone: undefined,
    address: undefined,
    cep: undefined,
    number: undefined,
    complement: "",
    neighborhood: undefined,
    city: undefined,
    state: undefined,
  });

  const handleOnSubmit = async (data: any) => {
    try {
      setLoading(true);
      await timeOut(500);
      await registerUser({
        formData: {
          ...data,
        },
      });
      toast.success("Aluno cadastrado com sucesso");
      navigate("/alunos");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar aluno. Tente novamente!");
    }
    setLoading(false);
  };

  const getCep = async (
    value: string,
    setValues: (
      values: React.SetStateAction<FormProps>,
      shouldValidate?: boolean | undefined
    ) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    value = value.replace(/\D/g, "");
    setDisableAddressFields(false);
    if (value.length === 8 && !loading) {
      setLoading(true);
      await timeOut(500);

      cep(value)
        .then(async (res) => {
          setValues((prevState) => ({
            ...prevState,
            address: res.street,
            neighborhood: res.neighborhood,
            city: res.city,
            state: res.state,
          }));
        })
        .catch((err) => {
          console.error(err);
          toast.error("CEP não encontrado. Tente novamente!");
        })
        .finally(() => setLoading(false));
      return;
    }
    setFieldValue("address", "");
    setFieldValue("neighborhood", "");
    setFieldValue("city", "");
    setFieldValue("state", "");
  };

  return (
    <S.ContainerPage>
      {loading && (
        <S.ContainerLoading>
          <Spin tip="Loading" size="large" />
        </S.ContainerLoading>
      )}
      <S.ContainerForm>
        <S.Title>Cadastro de aluno</S.Title>
        <Formik
          validationSchema={createUserSchema}
          initialValues={data}
          onSubmit={handleOnSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            setValues,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} className="form-register-user">
              <S.ContainerLine>
                <Input
                  type="text"
                  nameInput="name"
                  label="Nome completo"
                  placeholder="Digite o nome completo"
                  width={400}
                  fieldMandatory={true}
                  onChange={handleChange}
                  value={values.name}
                  errors={errors}
                />
                <Input
                  type="phone"
                  nameInput="phone"
                  label="Número de telefone"
                  placeholder="(00) 0 0000-0000"
                  fieldMandatory={true}
                  width={200}
                  onChange={handleChange}
                  value={values.phone}
                />
              </S.ContainerLine>
              <S.ContainerLine>
                <Input
                  type="cep"
                  nameInput="cep"
                  label="CEP"
                  placeholder="00000-000"
                  fieldMandatory={true}
                  width={165}
                  value={values.cep}
                  onChange={(e) => (
                    handleChange(e),
                    getCep(e.target.value, setValues, setFieldValue)
                  )}
                />
                <Input
                  type="text"
                  nameInput="address"
                  label="Endereço"
                  placeholder="Digite o endereço"
                  fieldMandatory={true}
                  width={240}
                  onChange={handleChange}
                  value={values.address}
                />
                <Input
                  type="number"
                  nameInput="number"
                  label="Número"
                  placeholder="00000"
                  maxLength={5}
                  fieldMandatory={true}
                  width={155}
                  onChange={handleChange}
                  value={values.number}
                />
              </S.ContainerLine>
              <S.ContainerLine>
                <Input
                  type="string"
                  nameInput="complement"
                  label="Complemento"
                  placeholder="Complemento"
                  width={130}
                  fieldMandatory={false}
                  onChange={handleChange}
                  value={values.complement}
                />
                <Input
                  type="text"
                  nameInput="neighborhood"
                  label="Bairro"
                  placeholder="Digite o bairro"
                  width={140}
                  fieldMandatory={true}
                  onChange={handleChange}
                  value={values.neighborhood}
                />
                <Input
                  type="text"
                  nameInput="city"
                  label="Cidade"
                  placeholder="Digite a cidade"
                  width={140}
                  fieldMandatory={true}
                  onChange={handleChange}
                  value={values.city}
                />
                <Input
                  type="text"
                  nameInput="state"
                  label="Estado"
                  placeholder="Digite o estado"
                  width={110}
                  fieldMandatory={true}
                  maxLength={2}
                  onChange={handleChange}
                  value={values.state}
                />
              </S.ContainerLine>
              <S.ContainerButton>
                <Button
                  type="primary"
                  htmlType="submit"
                  textButton="Cadastrar"
                />
                <div style={{ marginBottom: 15 }} />
                <Button
                  type="secondary"
                  onClick={() => navigate(-1)}
                  textButton="Voltar"
                />
              </S.ContainerButton>
            </Form>
          )}
        </Formik>
      </S.ContainerForm>
    </S.ContainerPage>
  );
};
