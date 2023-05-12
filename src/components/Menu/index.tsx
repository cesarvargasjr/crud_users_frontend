import { Button } from "../Button";
import * as S from "./styles";

export const Menu = () => {
  return (
    <S.ContainerMenu>
      <Button textButton="Cadastrar aluno" href="/" />
      <Button textButton="Ver alunos" href="/alunos" />
    </S.ContainerMenu>
  );
};
