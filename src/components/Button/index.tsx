import * as S from "./styles";

interface ButtonProps {
  textButton: string;
  onClick?: any;
  href?: string;
  htmlType?: any;
}

export const Button = ({
  textButton,
  onClick,
  href,
  htmlType,
}: ButtonProps) => {
  return (
    <S.ContainerButton onClick={onClick} href={href} htmlType={htmlType}>
      {textButton}
    </S.ContainerButton>
  );
};
