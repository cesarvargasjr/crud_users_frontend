import { Button } from "../../components/Button";
import { InputDefault } from "../../components/Input";
import { Form, Button as BtnAntd } from "antd";
import { useState } from "react";
import { registerUser } from "../../services/users";
import { toast } from "react-toastify";
import MaskedInput from "antd-mask-input";
import * as S from "./styles";

export const RegisterUser = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [number, setNumber] = useState<any>();
  const [cep, setCep] = useState<string>("");

  const handleSubmit = async () => {
    if (name !== "") {
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
      } catch (error) {
        console.log(error);
        toast.error("Erro ao cadastrar aluno");
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
                label="Telefone"
                placeholder="(00) 00000 - 0000"
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
                label="Número"
                placeholder="0000"
                maxLength={5}
                value={number}
                onChange={(e: any) => setNumber(e.target.value)}
              />
            </Form.Item>
          </S.ContainerLine>
          <S.ContainerLine>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Digite o número" }]}
            >
              <InputDefault
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
              {/* <InputDefault
                label="CEP"
                placeholder="000000 - 00"
                maxLength={8}
                value={cep}
                // ref={inputRef}
                // onChange={handleCepChange}
              /> */}
              <MaskedInput
                // placeholder="000000-00"
                mask={"00000-000"}
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
