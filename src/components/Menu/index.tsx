import { Button } from "../Button";
import * as S from "./styles";

export const Menu = () => {
  return (
    <S.ContainerMenu>
      <S.Title>Sistemas de Gerenciamento de alunos</S.Title>
      <Button
        type="primary"
        textButton="Cadastrar aluno"
        href="/cadastro-de-aluno"
      />
      <Button type="primary" textButton="Ver alunos" href="/alunos" />
    </S.ContainerMenu>
  );
};
