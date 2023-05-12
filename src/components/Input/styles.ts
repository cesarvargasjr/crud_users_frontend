import styled from "styled-components";
import colors from "../../styles/colors";
import { Input as InputAntd } from "antd";

interface InputProps {
  width?: number;
}

export const ContainerInput = styled(InputAntd).attrs({ type: "text" }) <InputProps>`
  display: flex;
  width: ${({ width }) => width ?? 200}px;
  flex-direction: column;
  font-size: 16px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.grey};
  width: 100%;
  margin-bottom: 3px;
`;