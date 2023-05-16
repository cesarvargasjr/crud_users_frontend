import { Button } from "../Button";
import * as S from "./styles";

export const Menu = () => {
  return (
    <S.ContainerMenu>
      <S.Title>Sistemas de Gerenciamento de alunos</S.Title>
      <Button textButton="Cadastrar aluno" href="/cadastro-de-aluno" />
      <Button textButton="Ver alunos" href="/alunos" />
    </S.ContainerMenu>
  );
};
