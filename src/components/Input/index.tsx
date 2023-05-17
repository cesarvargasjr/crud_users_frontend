import { ErrorMessage, Field } from "formik";
import MaskedInput from "react-text-mask";
import {
  cepMask,
  formatNumber,
  formatText,
  phoneNumberMask,
} from "../../utils/mask";
import * as S from "./styles";

export interface InputProps {
  type: string;
  label: string;
  placeholder?: string;
  nameInput: string;
  fieldMandatory: boolean;
  width?: number;
  data?: string | number;
  maxLength?: number;
  value?: any;
  errors?: any;
  onChange?: (e: any) => any;
}

export const Input = ({
  type,
  label,
  placeholder,
  onChange,
  value,
  nameInput,
  data,
  fieldMandatory,
  width,
  maxLength,
}: InputProps) => {
  function getInput() {
    switch (type) {
      case "string":
        return (
          <Field
            name={nameInput}
            type="text"
            render={({ field }: any) => (
              <input
                {...field}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={S.styleInput}
              />
            )}
          />
        );
      case "text":
        return (
          <Field
            name={nameInput}
            type="text"
            render={({ field }: any) => (
              <input
                {...field}
                value={value}
                onChange={onChange}
                onKeyDown={formatText}
                placeholder={placeholder}
                style={S.styleInput}
              />
            )}
          />
        );
      case "number":
        return (
          <Field
            name={nameInput}
            type="number"
            render={({ field }: any) => (
              <input
                {...field}
                maxLength={maxLength}
                onKeyDown={formatNumber}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                style={S.styleInput}
              />
            )}
          />
        );
      case "phone":
        return (
          <Field
            name={nameInput}
            render={({ field }: any) => (
              <MaskedInput
                {...field}
                type="text"
                value={value}
                onChange={onChange}
                mask={phoneNumberMask}
                placeholder={placeholder}
                style={S.styleInput}
              />
            )}
          />
        );
      case "cep":
        return (
          <Field
            name={nameInput}
            render={({ field }: any) => (
              <MaskedInput
                {...field}
                type="text"
                value={value}
                onChange={onChange}
                mask={cepMask}
                placeholder={placeholder}
                style={S.styleInput}
              />
            )}
          />
        );
    }
  }

  return (
    <S.BoxInput width={width}>
      <S.Label htmlFor={nameInput}>
        {label}
        {fieldMandatory && <S.LabelIcon>*</S.LabelIcon>}
      </S.Label>
      {getInput()}
      {(data === "" || data === undefined) && (
        <ErrorMessage name={nameInput}>
          {(msg: string) => <div style={S.styleError}>{msg}</div>}
        </ErrorMessage>
      )}
    </S.BoxInput>
  );
};
