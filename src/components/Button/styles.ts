import styled from "styled-components";
import { Button as BtnAntd } from "antd";

export const ButtonPrimary = styled(BtnAntd).attrs({
  type: "primary",
  ghost: false,
})`

  display: flex;
  width: 230px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export const ButtonSecondary = styled(BtnAntd).attrs({
  type: "default",
  ghost: false,
})`

  display: flex;
  width: 230px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;