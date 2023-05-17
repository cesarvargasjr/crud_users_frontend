import styled from "styled-components";
import colors from "../../styles/colors";

export const ContainerMenu = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  height: 300px;
  box-shadow: 0 0 2px 2px #0001;
  background-color: ${colors.white};
`;

export const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: ${colors.blue};
  width: 60%;
  text-align: center;
  margin-bottom: 35px;
`;