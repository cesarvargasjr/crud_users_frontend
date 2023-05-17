import * as S from "./styles";

interface ButtonProps {
  textButton: string;
  onClick?: any;
  href?: string;
  htmlType?: any;
  type: string;
}

export const Button = ({
  textButton,
  onClick,
  href,
  htmlType,
  type,
}: ButtonProps) => {
  function getButton() {
    switch (type) {
      case "primary":
        return (
          <S.ButtonPrimary onClick={onClick} href={href} htmlType={htmlType}>
            {textButton}
          </S.ButtonPrimary>
        );
      case "secondary":
        return (
          <S.ButtonSecondary onClick={onClick} href={href} htmlType={htmlType}>
            {textButton}
          </S.ButtonSecondary>
        );
    }
  }

  return <>{getButton()}</>;
};
