import { Button } from "../../components/Button";
import { InputDefault } from "../../components/Input";
import { Form, Button as BtnAntd, Spin } from "antd";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../../services/users";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { timeOut } from "../../utils/timeOut";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as S from "./styles";

interface DataProps {
  address: string;
  cep: string;
  city: string;
  id: number;
  name: string;
  neighborhood: string;
  number: number;
  phone: string;
}

export const UpdateUser = () => {
  const [data, setData] = useState<DataProps>();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [neighborhood, setNeighborhood] = useState<string>();
  const [city, setCity] = useState<string>();
  const [number, setNumber] = useState<number>(0);
  const [cep, setCep] = useState<string>();
  const { id }: any = useParams();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleUser = async () => {
    await timeOut(300);
    const response = await getUser(id);
    setData(response);
    setName(response?.name);
    setPhone(response?.phone);
    setAddress(response?.address);
    setNeighborhood(response?.neighborhood);
    setCity(response?.city);
    setNumber(response?.number);
    setCep(response?.cep);
  };

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
        await updateUser(id, {
          name: name,
          phone: phone,
          address: address,
          neighborhood: neighborhood,
          city: city,
          number: number,
          cep: cep,
        });
        toast.success("Cadastrado atualizado com sucesso");
        navigate("/alunos");
      } catch (error) {
        console.log(error);
        toast.error("Erro ao editar cadastrar do aluno");
      }
    }
  };

  const handleCepChange = (e: any) => {
    setCep(e.target.value);
  };

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.ContainerPage>
      {data === undefined ? (
        <Spin indicator={antIcon} />
      ) : (
        <S.ContainerForm>
          <Form name="basic">
            <S.Title>Edição de cadastro</S.Title>
            <S.ContainerLine>
              <Form.Item
                name="name"
                initialValue={name}
                rules={[{ required: true, message: "Digite o nome completo" }]}
              >
                <InputDefault
                  type="string"
                  label="Nome do aluno"
                  placeholder="Nome completo"
                  maxLength={70}
                  width={420}
                  value={name}
                  // defaultValue={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                // initialValue={phone}
                rules={[{ required: false, message: "Digite o telefone" }]}
              >
                <InputDefault
                  type="phone"
                  label="Telefone"
                  maxLength={11}
                  value={phone}
                  defaultValue={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </Form.Item>
            </S.ContainerLine>
            <S.ContainerLine>
              <Form.Item
                name="address"
                initialValue={address}
                rules={[{ required: true, message: "Digite o endereço" }]}
              >
                <InputDefault
                  type="string"
                  label="Endereço"
                  placeholder="Rua"
                  maxLength={80}
                  width={420}
                  value={address}
                  // defaultValue={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="number"
                initialValue={number}
                rules={[{ required: true, message: "Digite o número" }]}
              >
                <InputDefault
                  type="number"
                  label="Número"
                  placeholder="0000"
                  maxLength={5}
                  value={number}
                  // defaultValue={number}
                  onChange={(value: number) => setNumber(value)}
                />
              </Form.Item>
            </S.ContainerLine>
            <S.ContainerLine>
              <Form.Item
                name="city"
                initialValue={city}
                rules={[{ required: true, message: "Digite o número" }]}
              >
                <InputDefault
                  type="string"
                  label="Cidade"
                  placeholder="Nome da cidade"
                  maxLength={30}
                  value={city}
                  // defaultValue={city}
                  onChange={(e: any) => setCity(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="neighborhood"
                initialValue={neighborhood}
                rules={[{ required: true, message: "Digite o bairro" }]}
              >
                <InputDefault
                  type="string"
                  label="Bairro"
                  placeholder="Nome do bairro"
                  maxLength={30}
                  value={neighborhood}
                  // defaultValue={neighborhood}
                  onChange={(e: any) => setNeighborhood(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="cep"
                // initialValue={cep}
                rules={[{ required: false, message: "Digite o cep" }]}
              >
                <InputDefault
                  type="cep"
                  label="CEP"
                  maxLength={8}
                  value={cep}
                  defaultValue={cep}
                  onChange={handleCepChange}
                />
              </Form.Item>
            </S.ContainerLine>
            <S.ContainerButton>
              <Button
                htmlType="submit"
                textButton="Salvar"
                onClick={handleSubmit}
              />
              <BtnAntd type="link" href="/alunos" style={{ marginTop: 10 }}>
                Voltar
              </BtnAntd>
            </S.ContainerButton>
          </Form>
        </S.ContainerForm>
      )}
    </S.ContainerPage>
  );
};
