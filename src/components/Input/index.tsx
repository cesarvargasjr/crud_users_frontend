import * as S from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
  maxLength: number;
  value?: any;
  width?: number;
}

export const InputDefault = ({
  label,
  placeholder,
  maxLength,
  width,
  value,
}: InputProps) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.ContainerInput
        placeholder={placeholder}
        maxLength={maxLength}
        width={width}
        value={value}
      />
    </>
  );
};
