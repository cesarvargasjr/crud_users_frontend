import * as S from "./styles";

interface InputProps {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  value?: any;
  width?: number;
  onChange?: (_: any) => void;
}

export const InputDefault = ({
  label,
  placeholder,
  maxLength,
  width,
  value,
  onChange,
}: InputProps) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.ContainerInput
        placeholder={placeholder}
        maxLength={maxLength}
        width={width}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
