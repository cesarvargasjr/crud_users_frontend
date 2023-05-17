/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-sequences */
import React, { useEffect, useRef, useState } from "react";
import { deleteUser, getUsers } from "../../services/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { timeOut } from "../../utils/timeOut";
import { Button } from "../../components/Button";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import {
  Empty,
  Table,
  Space,
  Modal,
  Input,
  Button as BtnAntd,
  InputRef,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as S from "./styles";

interface DataProps {
  key: React.Key;
  name: string;
  phone: number;
  address: string;
  neighborhood: string;
  city: string;
  number: number;
  state: string;
  cep: number;
  complement: string;
}

type DataIndex = keyof DataProps;

export const Users = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [name, setName] = useState("");
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataProps> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Busque aqui...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <BtnAntd
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 94 }}
          >
            Buscar
          </BtnAntd>
          <BtnAntd
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 94 }}
          >
            Limpar
          </BtnAntd>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<DataProps> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      width: 170,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Endereço",
      key: "address",
      width: 250,
      ...getColumnSearchProps("address"),
      render: (record) => {
        const addressCompleted = `${record.address} - ${record.number}`;
        return <span>{addressCompleted}</span>;
      },
    },
    {
      title: "Complemento",
      key: "complement",
      width: 140,
      ...getColumnSearchProps("complement"),
      render: (record) => {
        const complementText = `${
          record.complement === "" ? "-" : record.complement
        }`;
        return <span>{complementText}</span>;
      },
    },
    {
      title: "Bairro",
      dataIndex: "neighborhood",
      key: "neighborhood",
      width: 150,
      ...getColumnSearchProps("neighborhood"),
    },
    {
      title: "Cidade",
      key: "city",
      width: 150,
      ...getColumnSearchProps("city"),
      render: (record) => {
        const cityAndState = `${record.city} - ${record.state}`;
        return <span>{cityAndState}</span>;
      },
    },
    {
      title: "Cep",
      dataIndex: "cep",
      key: "cep",
      width: 120,
      ...getColumnSearchProps("cep"),
    },
    {
      title: "Ações",
      dataIndex: "",
      key: "x",
      render: (rowData) => (
        <Space size="middle">
          <a>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                const id = rowData?.id;
                navigate(`/editar-aluno/${id}`);
              }}
            />
          </a>
          <a>
            <DeleteOutlined
              style={{ cursor: "pointer" }}
              onClick={() => (
                showModal(), setId(rowData?.id), setName(rowData?.name)
              )}
            />
          </a>
        </Space>
      ),
    },
  ];

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
      await timeOut(500);
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

  const renderEmpty = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_DEFAULT}
      description="Nenhum aluno encontrado."
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: 300,
      }}
    />
  );

  useEffect(() => {
    handleData();
  }, [loading]);

  return (
    <S.ContainerPage>
      <Modal
        title={`Deseja realmente excluir o aluno(a) ${name}?`}
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
        locale={{
          emptyText: renderEmpty,
        }}
        title={() => (
          <S.ContainerHeader>
            <S.Title>Alunos cadastrados</S.Title>
            <S.Box>
              <S.ContainerButton>
                <Button
                  type="primary"
                  href="/cadastro-de-aluno"
                  textButton="Adicionar"
                />
              </S.ContainerButton>
              <S.ContainerButton>
                <Button type="secondary" href="/" textButton="Voltar" />
              </S.ContainerButton>
            </S.Box>
          </S.ContainerHeader>
        )}
      />
    </S.ContainerPage>
  );
};
