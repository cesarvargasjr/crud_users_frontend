import * as S from "./styles";

interface ButtonProps {
  textButton: string;
  onClick?: any;
  href?: string;
}

export const Button = ({ textButton, onClick, href }: ButtonProps) => {
  return (
    <S.ContainerButton onClick={onClick} href={href}>
      {textButton}
    </S.ContainerButton>
  );
};
