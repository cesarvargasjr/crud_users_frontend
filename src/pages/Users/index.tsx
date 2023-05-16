import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Table, Space, Modal, Button as BtnAntd } from "antd";
import { deleteUser, getUsers } from "../../services/users";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import * as S from "./styles";

interface DataProps {
  key: React.Key;
  name: string;
  phone: number;
  address: string;
  neighborhood: string;
  city: string;
  number: number;
  cep: number;
}

export const Users = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<DataProps> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Telefone", dataIndex: "phone", key: "phone" },
    {
      title: "Endereço",
      key: "address",
      render: (text, record) => {
        const addressCompleted = `Rua ${record.address} - ${record.number}, ${record.neighborhood}, cidade ${record.city}, ${record.cep}`;
        return <span>{addressCompleted}</span>;
      },
    },
    {
      title: "Ações",
      dataIndex: "",
      key: "x",
      render: (rowData) => (
        <Space size="middle">
          <EditOutlined style={{ cursor: "pointer" }} />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            // eslint-disable-next-line no-sequences
            onClick={() => (showModal(), setId(rowData?.id))}
          />
        </Space>
      ),
    },
  ];

  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  console.log("id =>", id);

  const handleData = async () => {
    const response = await getUsers();
    setData(response);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      await sleep(500);
      await deleteUser(id);
      toast.success("Cadastrado excluído com sucesso");
    } catch (error) {
      setLoading(true);
      console.log(error);
      toast.error("Não foi possível excluir o aluno!");
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleData();
  }, [loading]);

  return (
    <S.ContainerPage>
      <Modal
        title="Deseja realmente excluir este aluno?"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Sim"
      />
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        title={() => (
          <S.ContainerHeader>
            <S.Title>Alunos cadastrados</S.Title>
            <BtnAntd type="link" size="large" href="/">
              Voltar
            </BtnAntd>
          </S.ContainerHeader>
        )}
      />
    </S.ContainerPage>
  );
};
