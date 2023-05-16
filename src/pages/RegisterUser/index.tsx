import { Button } from "../../components/Button";
import { InputDefault } from "../../components/Input";
import { Form, Button as BtnAntd } from "antd";
import { useState } from "react";
import { registerUser } from "../../services/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

export const RegisterUser = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [number, setNumber] = useState<any>();
  const [cep, setCep] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      name !== "" &&
      phone !== "" &&
      address !== "" &&
      neighborhood !== "" &&
      city !== "" &&
      number !== undefined &&
      cep !== ""
    ) {
      try {
        await registerUser({
          name: name,
          phone: phone,
          address: address,
          neighborhood: neighborhood,
          city: city,
          number: number,
          cep: cep,
        });
        toast.success("Aluno cadastrado com sucesso");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Erro ao cadastrar aluno. Tente novamente!");
      }
    }
  };

  const handleCepChange = (e: any) => {
    setCep(e.target.value);
  };

  return (
    <S.ContainerPage>
      <S.ContainerForm>
        <Form name="basic">
          <S.Title>Cadastro de aluno</S.Title>
          <S.ContainerLine>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Digite o nome completo" }]}
            >
              <InputDefault
                type="string"
                label="Nome do aluno"
                placeholder="Nome completo"
                maxLength={70}
                width={420}
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Digite o telefone" }]}
            >
              <InputDefault
                type="phone"
                label="Telefone"
                maxLength={11}
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />
            </Form.Item>
          </S.ContainerLine>
          <S.ContainerLine>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Digite o endereço" }]}
            >
              <InputDefault
                type="string"
                label="Endereço"
                placeholder="Rua"
                maxLength={80}
                width={420}
                value={address}
                onChange={(e: any) => setAddress(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="number"
              rules={[{ required: true, message: "Digite o número" }]}
            >
              <InputDefault
                type="number"
                label="Número"
                placeholder="0000"
                maxLength={5}
                value={number}
                onChange={(value: number) => setNumber(value)}
              />
            </Form.Item>
          </S.ContainerLine>
          <S.ContainerLine>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Digite o número" }]}
            >
              <InputDefault
                type="string"
                label="Cidade"
                placeholder="Nome da cidade"
                maxLength={30}
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="neighborhood"
              rules={[{ required: true, message: "Digite o bairro" }]}
            >
              <InputDefault
                type="string"
                label="Bairro"
                placeholder="Nome do bairro"
                maxLength={30}
                value={neighborhood}
                onChange={(e: any) => setNeighborhood(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="cep"
              rules={[{ required: true, message: "Digite o cep" }]}
            >
              <InputDefault
                type="cep"
                label="CEP"
                maxLength={8}
                value={cep}
                onChange={handleCepChange}
              />
            </Form.Item>
          </S.ContainerLine>
          <S.ContainerButton>
            <Button
              htmlType="submit"
              textButton="Cadastrar"
              onClick={handleSubmit}
            />
            <BtnAntd type="link" href="/" style={{ marginTop: 10 }}>
              Voltar
            </BtnAntd>
          </S.ContainerButton>
        </Form>
      </S.ContainerForm>
    </S.ContainerPage>
  );
};
