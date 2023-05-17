import styled from 'styled-components';
import colors from '../../styles/colors';

export const ContainerPage = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.greyLight};
`;

export const ContainerHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: ${colors.blue};
`;

export const ContainerButton = styled.div`
  display: flex;
  width: 100px;
`;

export const Box = styled.div`
  display: flex;
  width: 230px;
  justify-content: space-between;
`;