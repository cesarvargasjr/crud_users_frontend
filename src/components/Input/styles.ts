import styled from "styled-components";
import colors from "../../styles/colors";

interface InputProps {
  width?: number;
}

export const BoxInput = styled.div<InputProps>`
  width: ${({ width }) => width ?? 180}px;
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
  min-height: 80px;
`;

export const styleInput = {
  padding: '5px',
  paddingLeft: '7px',
  borderRadius: '6px',
  border: `rgba(0, 0, 0, 0.3) solid 1px`,
  display: 'flex',
  width: '100%',
  fontSize: '14px',
  fontWeight: '500',
};

export const styleError = {
  color: `${colors.red}`,
  marginTop: 6,
  fontSize: '13px',
};

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${colors.grey};
  margin-bottom: 2px;
`;

export const LabelIcon = styled.label`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.red};
  margin-left: 2px;
`;
