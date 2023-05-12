import { Button } from "../../components/Button";
import { InputDefault } from "../../components/Input";
import { Form } from "antd";
import * as S from "./styles";

export const RegisterUser = () => {
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
              />
            </Form.Item>
            <Form.Item
              name="number"
              rules={[{ required: true, message: "Digite o número" }]}
            >
              <InputDefault label="Número" placeholder="0000" maxLength={50} />
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
              />
            </Form.Item>
            <Form.Item
              name="cep"
              rules={[{ required: true, message: "Digite o cep" }]}
            >
              <InputDefault
                label="CEP"
                placeholder="000000 - 00"
                maxLength={8}
              />
            </Form.Item>
          </S.ContainerLine>
          <S.ContainerButton>
            <Button htmlType="submit" textButton="Cadastrar" />
          </S.ContainerButton>
        </Form>
      </S.ContainerForm>
    </S.ContainerPage>
  );
};
