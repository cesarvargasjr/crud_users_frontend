/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Form, Formik } from "formik";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { FormProps, getUser, updateUser } from "../../services/users";
import { toast } from "react-toastify";
import { timeOut } from "../../utils/timeOut";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createUserSchema } from "../../utils/schemaUser";
import cep from "cep-promise";
import * as S from "./styles";

export const UpdateUser = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disableAddressFields, setDisableAddressFields] = useState(true);
  const [data, setData] = useState<FormProps>({
    name: undefined,
    phone: undefined,
    address: undefined,
    cep: undefined,
    number: undefined,
    complement: "",
    neighborhood: undefined,
    city: undefined,
  });

  const handleUser = async () => {
    setLoading(true);
    await timeOut(400);
    const response = await getUser(id);
    setData(response);
    setLoading(false);
  };

  const handleOnSubmit = async (data: any) => {
    try {
      setLoading(true);
      await timeOut(400);
      await updateUser(id, {
        formData: {
          ...data,
        },
      });
      toast.success("Cadastrado atualizado com sucesso");
      navigate("/alunos");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar cadastro do aluno");
    }
    setLoading(false);
  };

  const getCep = async (
    value: string,
    setFieldError: (field: string, message: string | undefined) => void,
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
          setFieldError("cep", "CEP inválido");
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

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.ContainerPage>
      {loading && (
        <S.ContainerLoading>
          <Spin tip="Loading" size="large" />
        </S.ContainerLoading>
      )}
      <S.ContainerForm>
        <S.Title>Edição de cadastro</S.Title>
        <Formik
          validationSchema={createUserSchema}
          initialValues={data}
          onSubmit={handleOnSubmit}
          enableReinitialize
        >
          {({
            handleSubmit,
            values,
            errors,
            setValues,
            handleChange,
            setFieldError,
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
                  value={values.name}
                  errors={errors}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
                <Input
                  type="phone"
                  nameInput="phone"
                  label="Número de telefone"
                  placeholder="(00) 0 0000-0000"
                  fieldMandatory={true}
                  width={200}
                  value={values.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
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
                    getCep(
                      e.target.value,
                      setFieldError,
                      setValues,
                      setFieldValue
                    )
                  )}
                />
                <Input
                  type="text"
                  nameInput="address"
                  label="Endereço"
                  placeholder="Digite o endereço"
                  fieldMandatory={true}
                  width={240}
                  value={values.address}
                  onChange={(e) =>
                    setValues({ ...values, address: e.target.value })
                  }
                />
                <Input
                  type="number"
                  nameInput="number"
                  label="Número"
                  placeholder="00000"
                  maxLength={5}
                  fieldMandatory={true}
                  width={155}
                  value={values.number}
                  onChange={(e) =>
                    setValues({ ...values, number: e.target.value })
                  }
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
                  value={values.complement}
                  onChange={(e) =>
                    setValues({ ...values, complement: e.target.value })
                  }
                />
                <Input
                  type="text"
                  nameInput="neighborhood"
                  label="Bairro"
                  placeholder="Digite o bairro"
                  width={140}
                  fieldMandatory={true}
                  value={values.neighborhood}
                  onChange={(e) =>
                    setValues({ ...values, neighborhood: e.target.value })
                  }
                />
                <Input
                  type="text"
                  nameInput="city"
                  label="Cidade"
                  placeholder="Digite a cidade"
                  width={140}
                  fieldMandatory={true}
                  value={values.city}
                  onChange={(e) =>
                    setValues({ ...values, city: e.target.value })
                  }
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
                <Button type="secondary" href="/alunos" textButton="Voltar" />
              </S.ContainerButton>
            </Form>
          )}
        </Formik>
      </S.ContainerForm>
    </S.ContainerPage>
  );
};
