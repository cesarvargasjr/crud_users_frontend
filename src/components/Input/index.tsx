import { InputNumber } from "antd";
import MaskedInput from "antd-mask-input";
import * as S from "./styles";

interface InputProps {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  value?: any;
  width?: number;
  type?: string;
  onChange?: (_: any) => void;
}

export const InputDefault = ({
  label,
  placeholder,
  maxLength,
  width,
  value,
  onChange,
  type,
}: InputProps) => {
  function getInput() {
    switch (type) {
      case "string":
        return (
          <S.ContainerInput
            placeholder={placeholder}
            maxLength={maxLength}
            width={width}
            value={value}
            onChange={onChange}
          />
        );
      case "number":
        return (
          <InputNumber
            style={{ width: 200 }}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            value={value}
            controls={false}
          />
        );
      case "cep":
        return <MaskedInput mask={"00000-000"} onChange={onChange} />;
      case "phone":
        return <MaskedInput mask={"(00) 00000-0000"} onChange={onChange} />;
    }
  }

  return (
    <>
      <S.Label>{label}</S.Label>
      {getInput()}
    </>
  );
};
